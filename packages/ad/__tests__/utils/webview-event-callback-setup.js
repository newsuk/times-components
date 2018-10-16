import webviewEventCallbackSetup from "../../src/utils/webview-event-callback-setup";
import { expectFunctionToBeSelfContained } from "../../fixtures/check-self-contained-function";

const realWindow = window;

export default () => {
  let window;
  let errorHandler;

  beforeEach(() => {
    jest.useFakeTimers();
    window = {
      addEventListener: jest.fn().mockImplementation((name, handler) => {
        if (name === "error") {
          if (errorHandler) {
            throw new Error("Can't install 2 error handlers");
          }

          errorHandler = handler;
        }
      }),
      console: {},
      originalPostMessage: {},
      postMessage: jest.fn().mockImplementation(data => {
        window.reactBridgePostMessageDecoded(JSON.parse(data));
      }),
      reactBridgePostMessageDecoded: jest.fn(),
      requestAnimationFrame: realWindow.requestAnimationFrame,
      setTimeout: realWindow.setTimeout
    };
    errorHandler = null;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("is self-contained", () => {
    expectFunctionToBeSelfContained(webviewEventCallbackSetup);
  });

  it("sets the eventCallback function on the window", () => {
    expect(window.eventCallback).toBeUndefined();
    webviewEventCallbackSetup({ window });
    expect(window.eventCallback).toEqual(expect.any(Function));
  });

  it("falls abck to postMessage if reactBridgePostMessage if not available", () => {
    webviewEventCallbackSetup({ window });
    window.postMessage = jest.fn();
    delete window.reactBridgePostMessage;
    window.eventCallback("TYPE", "DETAIL");
    jest.runAllTimers();
    expect(window.postMessage).toHaveBeenCalledTimes(1);
  });

  const expectMessageFromError = (error, messageDetail) => {
    webviewEventCallbackSetup({ window });
    errorHandler(error);
    jest.runAllTimers();
    expect(window.reactBridgePostMessageDecoded).toHaveBeenCalledWith({
      detail: messageDetail,
      isTngMessage: true,
      type: "error"
    });
  };

  it("posts a message to the parent when the global error handler is called", () => {
    const error = {
      colno: "d",
      filename: "b",
      lineno: "c",
      message: "a"
    };
    expectMessageFromError(error, "msg=a, file=b, line=c, col=d");
  });

  it("truncates the filename if it is longer than 100 characters", () => {
    const longFileName =
      "0   + * & 10  + * & 20  + * & 30  + * & 40  + * & 50  + * & 60  + * & 70  + * & 80  + * & 90  + * & 100 + * & 110 + * & 120 + * & 130 + * & 140 + * & 150 + * & 160 + * & 170 + * & 180 + * & 190 + * & ";
    const truncatedFileName =
      "0   + * & 10  + * & 20  + * & 30  + * & 40  + * & 50  + * & 60  + * & 70  + * & 80  + * & 90  + * & ";
    const error = {
      colno: "d",
      filename: longFileName,
      lineno: "c",
      message: "a"
    };
    expectMessageFromError(
      error,
      `msg=a, file=${truncatedFileName}, line=c, col=d`
    );
  });

  it("does not error if event properties are missing", () => {
    const error = {};
    expectMessageFromError(error, `msg=, file=, line=, col=`);
  });

  it("posts a message to the parent when a console error is logged", () => {
    webviewEventCallbackSetup({ window });
    window.console.error("a", "b", "c");
    jest.runAllTimers();
    expect(window.reactBridgePostMessageDecoded).toHaveBeenCalledWith({
      detail: "a\nb\nc",
      isTngMessage: true,
      type: "error"
    });
  });
};
