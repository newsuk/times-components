import { Text } from "react-native";
import test from "../shared";
import Link, { TextLink } from "../../link";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "android";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.android || obj.default);
  return reactNative;
});

describe("Link test on android", () => {
  test(Link, TextLink, Text);
});
