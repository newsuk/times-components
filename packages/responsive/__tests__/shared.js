import React from "react";
import TestRenderer from "react-test-renderer";
import Responsive, { ResponsiveContext } from "../src/responsive";

let dimensionChangeHandler;
const dimensionUpdate = newWidth => {
  if (dimensionChangeHandler) {
    dimensionChangeHandler({
      screen: { height: 500, width: newWidth },
      window: { height: 500, width: newWidth }
    });
  }
};
jest.mock("Dimensions", () => ({
  addEventListener: (event, handler) => {
    if (event === "change") {
      dimensionChangeHandler = handler;
    }
  },
  get: () => ({ height: 500, width: 750 })
}));

export default () => {
  it("with default values", () => {
    const testInstance = TestRenderer.create(
      <Responsive>
        <ResponsiveContext.Consumer>
          {context => JSON.stringify(context)}
        </ResponsiveContext.Consumer>
      </Responsive>
    );

    expect(testInstance).toMatchSnapshot();

    dimensionUpdate(1000);
    expect(testInstance).toMatchSnapshot("after width update");
  });
};
