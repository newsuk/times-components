/* eslint-env jest */

import authorHeadTests from "../author-head.test.js";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.ios || obj.default);
  return reactNative;
});

describe("AuthorHead test on ios", () => {
  authorHeadTests();
});
