/* eslint-env jest */

import { breakpoints } from "@times-components/styleguide";

let dimensionChangeHandlers = [];
let dimensions = { height: 700, width: 500 };

const setDimension = ({ height, width }) => {
  dimensions = { height, width };

  dimensionChangeHandlers.forEach(handler =>
    handler({
      screen: dimensions,
      window: dimensions
    })
  );
};

const setIsTablet = isTablet =>
  setDimension(
    isTablet
      ? {
          height: breakpoints.nativeTablet / 2,
          width: breakpoints.nativeTablet + 1
        }
      : {
          height: breakpoints.nativeTablet + 1,
          width: breakpoints.nativeTablet / 2
        }
  );

const dimensionsMock = {
  __mock__setDimension: setDimension,
  __mock__setIsTablet: setIsTablet,
  addEventListener: (event, handler) => {
    if (event === "change") {
      dimensionChangeHandlers.push(handler);
    }
  },
  removeEventListener: (event, handler) => {
    if (event === "change") {
      dimensionChangeHandlers = dimensionChangeHandlers.filter(
        h => h !== handler
      );
    }
  },
  get: () => dimensions
};

jest.doMock("Dimensions", () => dimensionsMock);

jest.doMock("react-native-web", () => {
  const reactNativeModule = jest.requireActual("react-native-web");

  reactNativeModule.Dimensions = dimensionsMock;

  return reactNativeModule;
});

afterEach(() => {
  dimensionChangeHandlers = [];
});

export { setDimension, setIsTablet };
