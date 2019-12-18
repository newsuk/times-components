/* eslint-disable no-console */
import { Linking } from "react-native";
import DOMContextNative from "../src/dom-context";

// prevent function sources appearing in snapshots
jest.mock(
  "../src/utils/webview-event-callback-setup",
  () => "mockErrorHandler"
);
jest.mock("../src/utils/ad-init", () => {});
jest.mock("react-native-webview", () => ({
  WebView: "WebView"
}));

export default () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const makeMessageEvent = (type, detail) => ({
    nativeEvent: {
      data: JSON.stringify({
        detail,
        isTngMessage: true,
        type
      })
    }
  });

  it("Does not error on messages containing invalid JSON", () => {
    const component = new DOMContextNative({
      ...DOMContextNative.defaultProps
    });
    const f = () =>
      component.handleMessageEvent({
        nativeEvent: {
          data: "Non-JSON string e.g. sent by some 3rd party lib in WebView"
        }
      });
    expect(f).not.toThrowError();
  });

  it("calls onRenderComplete when it receives a renderComplete event from the webview", () => {
    const onRenderComplete = jest.fn();
    const component = new DOMContextNative({
      ...DOMContextNative.defaultProps,
      onRenderComplete
    });

    expect(onRenderComplete).not.toHaveBeenCalled();
    component.handleMessageEvent(makeMessageEvent("renderComplete"));
    expect(onRenderComplete).toHaveBeenCalledTimes(1);
  });

  it("calls inViewport when it receives a unrulyLoaded event from the webview and we are loaded", () => {
    const inViewport = jest.fn();
    const component = new DOMContextNative(DOMContextNative.defaultProps);
    component.state = {
      loaded: true
    };
    component.isVisible = true;
    component.inViewport = inViewport;

    component.handleMessageEvent(makeMessageEvent("unrulyLoaded"));
    expect(inViewport).toHaveBeenCalledTimes(1);
  });

  it("doesnt call inViewport when it receives a unrulyLoaded event from the webview and we are not visible", () => {
    const inViewport = jest.fn();
    const component = new DOMContextNative(DOMContextNative.defaultProps);
    component.state = {
      loaded: true
    };
    component.isVisible = false;
    component.inViewport = inViewport;

    component.handleMessageEvent(makeMessageEvent("unrulyLoaded"));
    expect(inViewport).toHaveBeenCalledTimes(0);
  });

  it("calls onRenderError when it receives a onRenderError event from the webview", () => {
    const onRenderError = jest.fn();
    const component = new DOMContextNative({
      ...DOMContextNative.defaultProps,
      onRenderError
    });

    expect(onRenderError).not.toHaveBeenCalled();
    component.handleMessageEvent(makeMessageEvent("renderFailed"));
    expect(onRenderError).toHaveBeenCalledTimes(1);
  });

  it("logs a console message when it receives a log event from the webview in debug mode", () => {
    jest.spyOn(console, "log").mockImplementation();
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(console, "warn").mockImplementation();
    jest.spyOn(console, "debug").mockImplementation();
    jest.spyOn(console, "info").mockImplementation();

    const props = DOMContextNative.defaultProps;
    props.data.debug = true;
    const component = new DOMContextNative({
      ...props
    });

    expect(console.log).not.toHaveBeenCalled();
    component.handleMessageEvent(makeMessageEvent("log", "message"));
    expect(console.log).toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("error", "message"));
    expect(console.error).toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("warn", "message"));
    expect(console.warn).toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("info", "message"));
    expect(console.info).toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("debug", "message"));
    expect(console.debug).toHaveBeenCalledWith("message");
  });

  it("does not log a console message when it receives a log event from the webview", () => {
    jest.spyOn(console, "log").mockImplementation();
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(console, "warn").mockImplementation();
    jest.spyOn(console, "info").mockImplementation();
    jest.spyOn(console, "debug").mockImplementation();

    const props = DOMContextNative.defaultProps;
    props.data.debug = false;
    const component = new DOMContextNative({
      ...props
    });

    expect(console.log).not.toHaveBeenCalled();
    component.handleMessageEvent(makeMessageEvent("log", "message"));
    expect(console.log).not.toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("error", "message"));
    expect(console.error).not.toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("warn", "message"));
    expect(console.warn).not.toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("info", "message"));
    expect(console.info).not.toHaveBeenCalledWith("message");

    component.handleMessageEvent(makeMessageEvent("debug", "message"));
    expect(console.debug).not.toHaveBeenCalledWith("message");
  });

  it("hasDifferentOrigin does not allow null origins", () => {
    const result = DOMContextNative.hasDifferentOrigin(
      null,
      "https://mock-url.com/"
    );
    expect(result).toEqual(null);
  });

  it("hasDifferentOrigin does not allow equal origins", () => {
    const result = DOMContextNative.hasDifferentOrigin(
      "https://mock-url.com/",
      "https://mock-url.com/"
    );
    expect(result).toEqual(false);
  });

  it("hasDifferentOrigin verifies if origin is the same", () => {
    const result = DOMContextNative.hasDifferentOrigin(
      "http://originB.com",
      "https://mock-url.com/"
    );
    expect(result).toEqual(true);
  });

  it("hasDifferentOrigin returns false if incorrect URL was provided", () => {
    const result = DOMContextNative.hasDifferentOrigin(
      "about:blank",
      "https://mock-url.com/"
    );
    expect(result).toEqual(false);
  });

  const setUpNavigationTest = canOpenURLImpl => {
    jest.spyOn(Linking, "canOpenURL").mockImplementation(canOpenURLImpl);
    jest
      .spyOn(Linking, "openURL")
      .mockImplementation(() => new Promise(resolve => resolve()));

    const domContext = new DOMContextNative({
      baseUrl: "http://originA.com"
    });
    domContext.webView = {
      stopLoading: jest.fn()
    };
    return domContext;
  };

  it("openURLInBrowser should try to open a link", done => {
    setUpNavigationTest(() => Promise.resolve(true));

    const navigateTo = "http://originB.com";

    DOMContextNative.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        expect(Linking.openURL).toHaveBeenCalledWith(navigateTo);
        done();
      })
      .catch(done);
  });

  it("handleNavigationStateChange should log an error if the url can't be opened", done => {
    setUpNavigationTest(() => Promise.resolve(false));
    jest.spyOn(console, "error").mockImplementation();

    const navigateTo = "http://originB.com";

    DOMContextNative.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalled();
        expect(Linking.openURL).not.toHaveBeenCalled();
        done();
      })
      .catch(done);
  });

  it("handleNavigationStateChange should return error if canOpenURL throws error", done => {
    setUpNavigationTest(() => Promise.reject(new Error("mock err")));

    const navigateTo = "http://originB.com";

    expect(DOMContextNative.openURLInBrowser(navigateTo)).rejects.toEqual({
      error: new Error("mock err")
    });
    done();
  });

  it("handleOriginChange should prevent webview from loading when it opens a link", () => {
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(DOMContextNative, "openURLInBrowser");
    domContext.handleNavigationStateChange({ url: "http://originB.com" });
    expect(domContext.webView.stopLoading).toHaveBeenCalled();
    expect(DOMContextNative.openURLInBrowser).toHaveBeenCalled();
  });

  it("handleOriginChange should not open a link when the origin is the same", () => {
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(DOMContextNative, "openURLInBrowser");
    domContext.handleNavigationStateChange({
      url: "http://originA.com/same-oigin-different-url"
    });
    expect(DOMContextNative.openURLInBrowser).not.toHaveBeenCalled();
  });

  it("handleOriginChange should not open a link when the URL scheme is the magic prefix used by React Native postMessage", () => {
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(DOMContextNative, "openURLInBrowser");
    domContext.handleNavigationStateChange({
      url: "react-js-navigation://foo"
    });
    expect(DOMContextNative.openURLInBrowser).not.toHaveBeenCalled();
  });
};
