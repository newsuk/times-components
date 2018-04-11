import webviewEventCallbackSetup from "../src/webview-event-callback-setup";
import { expectFunctionToBeSelfContained } from "./check-self-contained-function";

const realWindow = window;

describe("webviewEventCallbackSetup", () => {
  let window;
  let errorHandler;

  beforeEach(() => {
    jest.useFakeTimers();
    window = {
      reactBridgePostMessage: jest.fn().mockImplementation((data, origin) => {
        window.reactBridgePostMessageDecoded(JSON.parse(data), origin);
      }),
      reactBridgePostMessageDecoded: jest.fn(),
      requestAnimationFrame: realWindow.requestAnimationFrame,
      setTimeout: realWindow.setTimeout,
      console: {},
      addEventListener: jest.fn().mockImplementation((name, handler) => {
        if (name === "error") {
          if (errorHandler) {
            throw new Error("Can't install 2 error handlers");
          }
          errorHandler = handler;
        }
      })
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

  it("posts a delayed message to the parent when the event callback is called", () => {
    webviewEventCallbackSetup({ window });
    window.eventCallback("TYPE", "DETAIL");
    expect(window.reactBridgePostMessageDecoded).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(window.reactBridgePostMessageDecoded).toHaveBeenCalledWith(
      {
        isTngMessage: true,
        type: "TYPE",
        detail: "DETAIL"
      },
      "*"
    );
  });

  it("preferrs reactBridgePostMessage if available", () => {
    webviewEventCallbackSetup({ window });
    window.postMessage = jest.fn();
    window.reactBridgePostMessage = jest.fn();
    window.eventCallback("TYPE", "DETAIL");
    jest.runAllTimers();
    expect(window.postMessage).toHaveBeenCalledTimes(0);
    expect(window.reactBridgePostMessage).toHaveBeenCalledTimes(1);
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
    expect(window.reactBridgePostMessageDecoded).toHaveBeenCalledWith(
      {
        isTngMessage: true,
        type: "error",
        detail: messageDetail
      },
      "*"
    );
  };

  it("posts a message to the parent when the global error handler is called", () => {
    const error = {
      message: "a",
      filename: "b",
      lineno: "c",
      colno: "d"
    };
    expectMessageFromError(error, "msg=a, file=b, line=c, col=d");
  });

  it("truncates the filename if it is longer than 100 characters", () => {
    const longFileName =
      "0   + * & 10  + * & 20  + * & 30  + * & 40  + * & 50  + * & 60  + * & 70  + * & 80  + * & 90  + * & 100 + * & 110 + * & 120 + * & 130 + * & 140 + * & 150 + * & 160 + * & 170 + * & 180 + * & 190 + * & ";
    const truncatedFileName =
      "0   + * & 10  + * & 20  + * & 30  + * & 40  + * & 50  + * & 60  + * & 70  + * & 80  + * & 90  + * & ";
    const error = {
      message: "a",
      filename: longFileName,
      lineno: "c",
      colno: "d"
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
    expect(window.reactBridgePostMessageDecoded).toHaveBeenCalledWith(
      {
        isTngMessage: true,
        type: "error",
        detail: "a\nb\nc"
      },
      "*"
    );
  });
});
