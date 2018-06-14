import React from "react";
import { Linking } from "react-native";
import renderer from "react-test-renderer";

import DOMContextNative from "../src/dom-context";

// prevent function sources appearing in snapshots
jest.mock("../src/webview-event-callback-setup", () => "mockErrorHandler");

jest.mock("WebView", () => "WebView"); // https://github.com/facebook/react-native/issues/12440

export default () => {
  describe("DOMContext Native", () => {
    afterEach(() => {
      jest.resetModules();
      jest.clearAllMocks();
    });

    const makeMessageEvent = (type, detail) => ({
      nativeEvent: {
        data: JSON.stringify({
          isTngMessage: true,
          type,
          detail
        })
      }
    });

    it("throws an exception when the webview reports an error outside production mode", () => {
      const originalEnv = process.env.NODE_ENV;
      try {
        process.env.NODE_ENV = "development";
        const component = new DOMContextNative({
          ...DOMContextNative.defaultProps
        });
        const f = () =>
          component.handleMessageEvent(makeMessageEvent("error", "message"));
        expect(f).toThrowError(new Error("Error inside WebView: message"));
      } finally {
        process.env.NODE_ENV = originalEnv;
      }
    });

    it("does not throw an exception when the webview reports an error in production mode", () => {
      const originalEnv = process.env.NODE_ENV;
      try {
        process.env.NODE_ENV = "production";
        const component = new DOMContextNative({
          ...DOMContextNative.defaultProps
        });
        const f = () =>
          component.handleMessageEvent(makeMessageEvent("error", "message"));
        expect(f).not.toThrow();
      } finally {
        process.env.NODE_ENV = originalEnv;
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

    it("renders correctly", () => {
      const component = renderer.create(
        <DOMContextNative init={() => {}} data={{ foo: "bar" }} />
      );
      const s = component.toJSON();

      expect(s).toMatchSnapshot();
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

    it("logs a console message when it receives a log event from the webview", () => {
      jest.spyOn(console, "log").mockImplementation();

      const component = new DOMContextNative({
        ...DOMContextNative.defaultProps
      });

      expect(console.log).not.toHaveBeenCalled(); // eslint-disable-line no-console
      component.handleMessageEvent(makeMessageEvent("log", "message"));
      expect(console.log).toHaveBeenCalledWith("message"); // eslint-disable-line no-console
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
  });
};
