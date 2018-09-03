import React from "react";
import { Linking } from "react-native";
import { shallow } from "enzyme";
import InteractiveWrapper from "../src/interactive-wrapper";

export default () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    console.error = jest.fn(); // eslint-disable-line no-console
  });

  const setUpNavigationTest = canOpenURLImpl => {
    jest.spyOn(Linking, "canOpenURL").mockImplementation(canOpenURLImpl);
    jest
      .spyOn(Linking, "openURL")
      .mockImplementation(() => new Promise(resolve => resolve()));

    const interactiveWrapper = new InteractiveWrapper();
    interactiveWrapper.webview = {
      stopLoading: jest.fn(),
      postMessage: jest.fn()
    };
    return interactiveWrapper;
  };

  const makeMessageEvent = height => ({
    nativeEvent: {
      data: height
    }
  });

  it("When receiving a message from the webview, the height is set in state", () => {
    const component = shallow(<InteractiveWrapper id="123456789" />);
    component.instance().onMessage(makeMessageEvent(400));
    expect(component.state().height).toEqual(400);
  });

  it("Console errors when message object is incorrect", () => {
    const component = new InteractiveWrapper();
    component.onMessage({ nativeEvent: { error: "Nonsense" } });
    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  });

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

    InteractiveWrapper.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        expect(console.error).toHaveBeenCalledWith("Cant open url", navigateTo); // eslint-disable-line no-console
        done();
      })
      .catch(done);
  });

  it("openURLInBrowser should try to open a link and fail", done => {
    setUpNavigationTest(() => Promise.reject(new Error("mock err")));

    const navigateTo = "failing url";

    InteractiveWrapper.openURLInBrowser(navigateTo)
      .then(() => {
        expect(Linking.canOpenURL).toHaveBeenCalledWith(navigateTo);
        expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
        done();
      })
      .catch(done);
  });

  it("onLoadEnd sends a postMessage", () => {
    const component = setUpNavigationTest(() => Promise.resolve(true));
    component.onLoadEnd();
    expect(component.webview.postMessage).toHaveBeenCalled();
  });

  it("handleNavigationStateChange should return error if canOpenURL throws error", done => {
    setUpNavigationTest(() => Promise.reject(new Error("mock err")));

    const navigateTo = "https://www.thetimes.co.uk";

    expect(InteractiveWrapper.openURLInBrowser(navigateTo)).rejects.toEqual({
      error: new Error("mock err")
    });
    done();
  });

  it("handleNavigationStateChange should prevent webview from loading when it opens a link", () => {
    const component = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(InteractiveWrapper, "openURLInBrowser");
    component.handleNavigationStateChange({
      url: "https://www.thetimes.co.uk"
    });
    expect(component.webview.stopLoading).toHaveBeenCalled();
    expect(InteractiveWrapper.openURLInBrowser).toHaveBeenCalled();
  });

  it("handleNavigationStateChange should not open a link when the origin is the same", () => {
    const component = setUpNavigationTest(() => Promise.resolve(true));
    jest.spyOn(InteractiveWrapper, "openURLInBrowser");
    component.handleNavigationStateChange({
      url:
        "http://cwfiyvo20d.execute-api.eu-west-1.amazonaws.com/same-origin-different-url"
    });
    expect(InteractiveWrapper.openURLInBrowser).not.toHaveBeenCalled();
  });
};
