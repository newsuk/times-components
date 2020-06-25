// eslint-disable-next-line import/prefer-default-export
export { setIsTablet, setDimension } from "@times-components-native/mocks/dimensions";

jest.mock("NativeAnimatedHelper", () => "NativeAnimatedHelper", {
  virtual: true
});

jest.mock("../src/safeAreaView", () => "SafeAreaView");

jest.mock("@times-components-native/gradient", () => ({
  OverlayGradient: "OverlayGradient"
}));

// eslint-disable-next-line global-require
jest.mock("@times-components-native/svgs", () => require("./mock-svg"));

jest.mock("@times-components-native/utils", () => {
  // eslint-disable-next-line global-require
  const actualUtils = jest.requireActual("@times-components-native/utils");

  return {
    ...actualUtils,
    convertToPixels: points => points - 1
  };
});
