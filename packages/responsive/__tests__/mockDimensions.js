// eslint-disable-next-line import/no-unresolved
import { __mock__setDimension as setDimension } from "Dimensions";

jest.mock("Dimensions", () => {
  let dimensionChangeHandler;

  return {
    __mock__setDimension: ({ height, width }) => {
      if (dimensionChangeHandler) {
        dimensionChangeHandler({
          screen: { height, width },
          window: { height, width }
        });
      }
    },
    addEventListener: (event, handler) => {
      if (event === "change") {
        dimensionChangeHandler = handler;
      }
    },
    get: () => ({ height: 500, width: 750 })
  };
});

export default setDimension;
