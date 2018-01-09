/* eslint-env jest */
import { Text } from "react-native";
import test from "../shared";
import Link, { TextLink } from "../../link";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.ios || obj.default);
  return reactNative;
});

describe("Link test on ios", () => {
  test(Link, TextLink, Text);
});
