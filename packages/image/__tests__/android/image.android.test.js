import imageTests from "../image.native.test";
import gestureTests from "../gestures.test";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "android";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.android || obj.default);
  return reactNative;
});

describe("Image test on android", () => {
  imageTests();
  gestureTests();
});
