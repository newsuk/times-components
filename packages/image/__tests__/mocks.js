// eslint-disable-next-line import/prefer-default-export
export { setIsTablet, setDimension } from "@times-components/mocks/dimensions";

jest.mock("NativeAnimatedHelper", () => "NativeAnimatedHelper", {
  virtual: true
});

jest.mock("../src/safeAreaView", () => "SafeAreaView");

jest.mock("@times-components/gradient", () => ({
  OverlayGradient: "OverlayGradient"
}));

// eslint-disable-next-line global-require
jest.mock("@times-components/svgs", () => require("./mock-svg"));

jest.mock("@times-components/utils", () => {
  // eslint-disable-next-line global-require
  const actualUtils = jest.requireActual("@times-components/utils");

  return {
    ...actualUtils,
    convertToPixels: points => points - 1
  };
});
