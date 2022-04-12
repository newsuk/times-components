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

jest.mock("@times-components/styleguide", () => ({
  colours: {
    functional: {
      action: "#006699",
      white: "#FFFFFF",
      backgroundSecondary: "#EDEDED"
    }
  }
}));
