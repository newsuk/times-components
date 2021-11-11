export { setIsTablet, setDimension } from "@times-components/mocks/dimensions";

jest.mock("@times-components/gradient", () => ({
  OverlayGradient: "OverlayGradient"
}));

jest.mock("@times-components/utils", () => {
  const actualUtils = jest.requireActual("@times-components/utils");

  return {
    ...actualUtils,
    convertToPixels: points => points - 1
  };
});
