import React from "react";
import { Linking } from "react-native";
import TestRenderer from "react-test-renderer";
import InteractiveWrapper from "../src/interactive-wrapper";

export default () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  const setUpNavigationTest = canOpenURLImpl => {
    jest.spyOn(Linking, "canOpenURL").mockImplementation(canOpenURLImpl);
    jest
      .spyOn(Linking, "openURL")
      .mockImplementation(() => new Promise(resolve => resolve()));

    const interactiveWrapper = new InteractiveWrapper();
    interactiveWrapper.webview = {
      stopLoading: jest.fn(),
      postMessage: jest.fn(),
    };
    return interactiveWrapper;
  };

  const makeMessageEvent = (height) => ({
    nativeEvent: {
      data: height
    }
  });

  it("Does not error on messages containing invalid JSON", () => {
    const component = new InteractiveWrapper();
    const f = () =>
      component.onMessage(makeMessageEvent(400));
    expect(f).not.toThrowError();
  });

  // it("james test", () => {
  //   const root = TestRenderer.create(<InteractiveWrapper id="a0534eee-682e-4955-8e1e-84b428ef1e79" />).root
  //   console.log(root.instance.state)
  // })

  it("openURLInBrowser should try to open a link", done => {
    setUpNavigationTest(() => Promise.resolve(true));

    const navigateTo = "https://www.thetimes.co.uk";

    InteractiveWrapper.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        expect(Linking.openURL).toHaveBeenCalledWith(navigateTo);
        done();
      })
      .catch(done);
  });

  it("openURLInBrowser should try to open an invalid link", done => {
    setUpNavigationTest(() => Promise.resolve(false));

    const navigateTo = "failing url";
    console.error = jest.fn();

    InteractiveWrapper.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        expect(console.error).toHaveBeenCalledWith("Cant open url", navigateTo);
        done();
      })
      .catch(done);
  });

  it("openURLInBrowser should try to open a link and fail", done => {
    setUpNavigationTest(() => Promise.reject(new Error("mock err")));

    const navigateTo = "failing url";
    console.error = jest.fn();

    InteractiveWrapper.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        expect(console.error).toHaveBeenCalled();
        done();
      })
      .catch(done);
  });

  it('onLoadEnd sends a postMessage', ()=>{
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    domContext.onLoadEnd();
    expect(domContext.webview.postMessage).toHaveBeenCalled();
  })

  it("handleNavigationStateChange should return error if canOpenURL throws error", done => {
    setUpNavigationTest(() => Promise.reject(new Error("mock err")));

    const navigateTo = "https://www.thetimes.co.uk";

    expect(InteractiveWrapper.openURLInBrowser(navigateTo)).rejects.toEqual({
      error: new Error("mock err")
    });
    done();
  });

  it("handleOriginChange should prevent webview from loading when it opens a link", () => {
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(InteractiveWrapper, "openURLInBrowser");
    domContext.handleNavigationStateChange({ url: "https://www.thetimes.co.uk" });
    expect(domContext.webview.stopLoading).toHaveBeenCalled();
    expect(InteractiveWrapper.openURLInBrowser).toHaveBeenCalled();
  });

  it("handleOriginChange should not open a link when the origin is the same", () => {
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(InteractiveWrapper, "openURLInBrowser");
    domContext.handleNavigationStateChange({
      url: "http://cwfiyvo20d.execute-api.eu-west-1.amazonaws.com/same-origin-different-url"
    });
    expect(InteractiveWrapper.openURLInBrowser).not.toHaveBeenCalled();
  });

  it("handleOriginChange should not open a link when the URL scheme is the magic prefix used by React Native postMessage", () => {
    const domContext = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(InteractiveWrapper, "openURLInBrowser");
    domContext.handleNavigationStateChange({
      url: "react-js-navigation://foo"
    });
    expect(InteractiveWrapper.openURLInBrowser).not.toHaveBeenCalled();
  });
}
