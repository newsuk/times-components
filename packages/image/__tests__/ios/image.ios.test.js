/* eslint-env jest */

import imageTests from "../image.native.test";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.ios || obj.default);
  return reactNative;
});

describe("Image test on ios", () => {
  imageTests();
});
