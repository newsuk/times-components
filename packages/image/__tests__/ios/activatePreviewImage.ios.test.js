/* eslint-env jest */

import tests from "../activatePreviewImage.native.test";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.ios || obj.default);
  return reactNative;
});

describe("ActivatePreviewImage test on ios", () => {
  tests();
});
