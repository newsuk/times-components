import React from "react";
import renderer from "react-test-renderer";
import TestUtils from "react-dom/test-utils";
import { Linking } from "react-native";

import Ad from "../ad";

describe("Native Ad test", () => {
  const adProps = {
    adUnit: "mock-ad-unit",
    networkId: "mock-network-id",
    section: "mock-section",
    code: "mock-code",
    baseUrl: "https://mock-url.com/"
  };
  let ad;

  beforeEach(() => {
    ad = <Ad {...adProps} />;
    jest.unmock("ScrollView");
    jest.mock("WebView", () => "WebView");
    // jest.mock('Linking', () => 'Linking');
    jest.dontMock("../ad");
  });

  afterEach(() => {
    jest.unmock("Linking");
    // jest.clearAllMocks();
    // jest.resetAllMocks();
  });

  it("renders a native ad slot", () => {
    const tree = renderer.create(ad).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("hasDifferentOrigin does not allow null origins", () => {
    const result = Ad.hasDifferentOrigin(null, adProps.baseUrl);
    expect(result).toEqual(null);
  });

  it("hasDifferentOrigin does not allow equal origins", () => {
    const result = Ad.hasDifferentOrigin(adProps.baseUrl, adProps.baseUrl);
    expect(result).toEqual(false);
  });

  it("hasDifferentOrigin verifies if origin is the same", () => {
    const fakeUrl = "http://another-mock-url.com";
    const result = Ad.hasDifferentOrigin(fakeUrl, adProps.baseUrl);
    expect(result).toEqual(true);
  });

  it("hasDifferentOrigin returns false if incorrect URL was provided", () => {
    const fakeUrl = "about:blank";
    const result = Ad.hasDifferentOrigin(fakeUrl, adProps.baseUrl);
    expect(result).toEqual(false);
  });

  it("onOriginChange should try to open a link", done => {
    const fakeUrl = "http://another-mock-url.com";
    jest.mock("Linking", () => ({
      canOpenURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve(true))),
      openURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve()))
    }));

    Ad.onOriginChange(fakeUrl);
    expect(Linking.canOpenURL).toHaveBeenCalledWith(fakeUrl);
    Linking.canOpenURL().then(() => {
      expect(Linking.openURL).toHaveBeenCalled();
      done();
    });
    expect(Linking.canOpenURL.mock.calls.length).toEqual(2);
  });

  it("onOriginChange should return error if url is not supported", done => {
    const fakeUrl = "http://another-mock-url.com";
    jest.mock("Linking", () => ({
      canOpenURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve(false)))
    }));

    const consoleErrorSpy = jest.spyOn(console, "error");
    Ad.onOriginChange(fakeUrl);
    expect(Linking.canOpenURL.mock.calls.length).toEqual(1); // BUG found (retrives 3 instead of 1)
    Linking.canOpenURL().then(supported => {
      expect(supported).toEqual(false);
      expect(consoleErrorSpy).toHaveBeenCalled();
      done();
    });
  });

  it("getMaxHeight is 0 is no size is sent", () => {
    const result = Ad.getMaxHeight(null);
    expect(result).toEqual(0);
  });

  it("getMaxHeight should return the maximum height from an array of arrays of sizes", () => {
    const sizes = [[300, 250], [320, 50], [320, 48]];
    const result = Ad.getMaxHeight(sizes);
    expect(result).toEqual(250);
  });

  it("handleOriginChange should not do anything if the origin is the same", () => {
    const tree = TestUtils.renderIntoDocument(ad);
    const hasDifferentOriginSpy = jest.spyOn(Ad, "hasDifferentOrigin");
    const onOriginChangeSpy = jest.spyOn(Ad, "onOriginChange");
    tree.handleOriginChange(adProps.baseUrl);
    expect(hasDifferentOriginSpy).toHaveBeenCalled();
    expect(onOriginChangeSpy).not.toHaveBeenCalled();
  });

  it("handleOriginChange should prevent webview from loading and handle different origin if the origin is different", () => {
    const fakeUrl = "http://another-mock-url.com";
    const tree = TestUtils.renderIntoDocument(ad);
    tree.webview = {
      stopLoading: jest.fn()
    };
    jest.mock("Linking", () => ({
      canOpenURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve(true))),
      openURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve()))
    }));
    const hasDifferentOriginSpy = jest.spyOn(Ad, "hasDifferentOrigin");
    const onOriginChangeSpy = jest.spyOn(Ad, "onOriginChange");
    tree.handleOriginChange(fakeUrl);
    expect(hasDifferentOriginSpy).toHaveBeenCalled();
    expect(tree.webview.stopLoading).toHaveBeenCalled();
    expect(onOriginChangeSpy).toHaveBeenCalled();
  });

  it("handleNavigationChange should verify if origin is different", () => {
    const tree = TestUtils.renderIntoDocument(ad);
    const navState = {
      url: "http://another-mock-url.com"
    };
    tree.handleOriginChange = jest.fn();
    tree.handleNavigationChange(navState);
    expect(tree.handleOriginChange).toHaveBeenCalledWith(navState.url);
  });
});
