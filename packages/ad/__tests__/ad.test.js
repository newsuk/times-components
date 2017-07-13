import React from "react";
import renderer from "react-test-renderer";

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
  });

  it("renders an native ad slot", () => {
    const tree = renderer.create(ad).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("hasDifferentOrigin does not allow null origins", () => {
    const result = Ad.hasDifferentOrigin(null, adProps.baseUrl);
    expect(result).toEqual(false);
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

  it("onOriginChange should try to open a link", () => {
    const fakeUrl = "http://another-mock-url.com";
    const Linking = {
      canOpenURL: jest.fn(),
      openURL: jest.fn()
    };
    Ad.onOriginChange(fakeUrl);
    expect(Linking.canOpenURL).toHaveBeenCalled();
    expect(Linking.openURL).toHaveBeenCalled();
  });

  it("getMaxHeight should return the maximum height from an array of arrays of sizes", () => {
    const sizes = [[300, 250], [320, 50], [320, 48]];
    const result = Ad.getMaxHeight(sizes);
    expect(result).toEqual(250);
  });

  it("handleOriginChange should not do anything if the origin is the same", () => {
    const tree = renderer.create(ad);
    tree.handleOriginChange(adProps.baseUrl);
    expect(Ad.hasDifferentOrigin).toHaveBeenCalled();
    expect(Ad.onOriginChange).not.toHaveBeenCalled();
  });

  it("handleOriginChange should prevent webview from loading and handle different origin if the origin is different", () => {
    const fakeUrl = "http://another-mock-url.com";
    const tree = renderer.create(ad);
    tree.webview = {
      stopLoading: jest.fn()
    };
    tree.handleOriginChange(fakeUrl);
    expect(Ad.hasDifferentOrigin).toHaveBeenCalled();
    expect(tree.webview.stopLoading).toHaveBeenCalled();
    expect(Ad.onOriginChange).toHaveBeenCalled();
  });

  it("handleNavigationChange should verify if origin is different", () => {
    const tree = renderer.create(ad);
    const navState = {
      url: "http://another-mock-url.com"
    };
    tree.handleOriginChange(navState);
    expect(tree.handleOriginChange).toHaveBeenCalledWith(navState.url);
  });
});
