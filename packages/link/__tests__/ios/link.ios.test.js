/* eslint-env jest */

import { Text } from "react-native";
import test from "../link-helper";
import Link, { TextLink } from "../../link.js";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.android || obj.default);
  return reactNative;
});

test(Link, TextLink, Text);
