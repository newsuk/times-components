/* eslint-env jest */

import shared from "../shared";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.ios || obj.default);
  return reactNative;
});

jest.mock("WebView", () => "WebView");

describe("Icons test on ios", () => {
  shared();
});
