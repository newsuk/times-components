import placeholderTests from "../placeholder.test";

jest.mock("react-native", () => {
  const reactNative = require.requireActual("react-native");
  reactNative.Platform.OS = "ios";
  jest
    .spyOn(reactNative.Platform, "select")
    .mockImplementation(obj => obj.ios || obj.default);
  return reactNative;
});

describe("Placeholder test on ios", () => {
  placeholderTests();
});
