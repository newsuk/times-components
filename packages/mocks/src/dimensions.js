/* eslint-disable camelcase,import/no-unresolved */
// eslint-disable-next-line no-undef
jest.mock(
  "Dimensions",
  () => {
    // eslint-disable-next-line global-require
    const { breakpoints } = require("@times-components/styleguide");
    let dimensionChangeHandler;
    let dimensions = { height: 700, width: 500 };

    const setDimension = ({ height, width }) => {
      dimensions = { height, width };
      if (dimensionChangeHandler) {
        dimensionChangeHandler({
          screen: dimensions,
          window: dimensions
        });
      }
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

    return {
      __mock__setDimension: setDimension,
      __mock__setIsTablet: setIsTablet,
      addEventListener: (event, handler) => {
        if (event === "change") {
          dimensionChangeHandler = handler;
        }
      },
      get: () => dimensions
    };
  },
  { virtual: true }
);

export {
  __mock__setDimension as setDimension,
  __mock__setIsTablet as setIsTablet
} from "Dimensions";
