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
