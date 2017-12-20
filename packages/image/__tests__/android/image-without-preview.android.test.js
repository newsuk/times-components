/* eslint-env jest */

import imageTests from "../image-without-preview.native.test";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "android";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.android || obj.default);
  return reactNative;
});

describe("ImageWithoutPreview test on android", () => {
  imageTests();
});
