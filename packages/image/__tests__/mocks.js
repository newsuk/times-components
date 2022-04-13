import React from "react";

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
    convertToPixels: points => points - 1,
    TcText: jest.fn(({ children }) => <p data-testid="TcText"> {children}</p>),
    TcTextLink: jest.fn(({ children }) => <p data-testid="TcTextLink"> {children}</p>),
    TcView: jest.fn(({ children }) => <div data-testid="TcView"> {children}</div>),
    TcScrollView: jest.fn(({ children }) => <div data-testid="TcScrollView"> {children}</div>)
  };
});

jest.mock("@times-components/styleguide", () => () => {
  return {
  ...jest.requireActual("@times-components/styleguide"),
  colours: {
    functional: {
      action: "#006699",
      white: "#FFFFFF",
      backgroundSecondary: "#EDEDED"
    }
  }
}
});
