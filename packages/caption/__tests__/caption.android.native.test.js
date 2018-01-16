import "react-native";
import shared from "./shared";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "android";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.android || obj.default);
  return reactNative;
});

shared();
