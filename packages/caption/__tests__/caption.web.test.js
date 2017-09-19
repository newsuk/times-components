/* eslint-env jest */

import "react-native";
import shared from "./shared";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "web";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.web || obj.default);
  return reactNative;
});

shared();
