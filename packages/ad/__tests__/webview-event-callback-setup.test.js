import webviewEventCallbackSetup from "../webview-event-callback-setup";
import { expectFunctionToBeSerialisable } from "./check-serialisable-function";

const realWindow = window;

describe("webviewEventCallbackSetup", () => {
  let window;

  beforeEach(() => {
    jest.useFakeTimers();
    window = {
      reactBridgePostMessage: jest.fn().mockImplementation((data, origin) => {
        window.reactBridgePostMessageDecoded(JSON.parse(data), origin);
      }),
      reactBridgePostMessageDecoded: jest.fn(),
      requestAnimationFrame: realWindow.requestAnimationFrame,
      console: {}
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("is serialisable", () => {
    expectFunctionToBeSerialisable(webviewEventCallbackSetup);
  });

  it("sets the eventCallback funciton on the window", () => {
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

  it("posts a message to the parent when the global error handler is called", () => {
    webviewEventCallbackSetup({ window });
    window.onerror("a", "b", "c", "d", "e");
    jest.runAllTimers();
    expect(window.reactBridgePostMessageDecoded).toHaveBeenCalledWith(
      {
        isTngMessage: true,
        type: "error",
        detail: "msg=a, file=b, line=c, col=d, error=e"
      },
      "*"
    );
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
