/* eslint-env jest */

import tests from "../activatePreviewImage.native.test";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "android";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.android || obj.default);
  return reactNative;
});
describe("ActivatePreviewImage test on android", () => {
  tests();
});
