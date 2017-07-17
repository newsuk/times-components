import React from "react";
import renderer from "react-test-renderer";
import TestUtils from "react-dom/test-utils";

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
    jest.unmock("../ad");
  });

  afterEach(() => {});

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

    let refCanOpenURL;
    let refOpenURL;

    jest.mock("Linking", () => {
      const canOpenURL = jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve(true)));

      const openURL = jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve()));

      refCanOpenURL = canOpenURL;
      refOpenURL = openURL;

      return {
        canOpenURL,
        openURL
      };
    });

    Ad.onOriginChange(fakeUrl).then(() => {
      expect(refCanOpenURL).toHaveBeenCalledWith(fakeUrl);
      expect(refOpenURL).toHaveBeenCalled();
      expect(refCanOpenURL.mock.calls.length).toEqual(1);
      jest.resetModules();
      done();
    });
  });

  it("onOriginChange should return error if url is not supported", done => {
    const fakeUrl = "http://another-mock-url.com";

    jest.mock("Linking", () => ({
      canOpenURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve(false))),
      openURL: jest
        .fn()
        .mockImplementation(() => new Promise(resolve => resolve()))
    }));

    const consoleErrorSpy = jest.spyOn(console, "error");
    Ad.onOriginChange(fakeUrl).then(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
      jest.resetModules();
      done();
    });
  });

  it("onOriginChange should return error if canOpenURL throws error", done => {
    const fakeUrl = "http://another-mock-url.com";

    jest.mock("Linking", () => ({
      canOpenURL: jest
        .fn()
        .mockImplementation(
          () => new Promise((resolve, reject) => reject("mock err"))
        )
    }));

    expect(Ad.onOriginChange(fakeUrl)).rejects.toEqual({
      error: "mock err"
    });
    jest.resetModules();
    done();
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
    jest.resetModules();
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
