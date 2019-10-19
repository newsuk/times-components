/* eslint-disable global-require */
import React from "react";
import TestRenderer from "react-test-renderer";
import { Dimensions } from "react-native";
import Responsive, { ResponsiveContext } from "../src/responsive";

jest.mock("react-native", () => {
  let dims = { width: 480, height: 640, fontScale: 1.0 };
  return {
    Dimensions: {
      get: () => dims,
      set: ({ window }) => {
        dims = window;
      },
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }
  };
});

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
  });

  it("width values should update on device rotation", () => {
    const testInstance = TestRenderer.create(
      <Responsive>
        <ResponsiveContext.Consumer>
          {context => JSON.stringify(context)}
        </ResponsiveContext.Consumer>
      </Responsive>
    );

    expect(testInstance).toMatchSnapshot();
    Dimensions.set({ window: { height: 500, width: 1000, fontScale: 1.0 } });
    expect(testInstance).toMatchSnapshot("after width update");
  });

  it("addDimensionListener is called on mount", () => {
    // eslint-disable-next-line no-shadow
    const Responsive = require("../src/responsive").default;

    TestRenderer.create(
      <Responsive>
        <ResponsiveContext.Consumer>
          {context => JSON.stringify(context)}
        </ResponsiveContext.Consumer>
      </Responsive>
    );

    expect(Dimensions.addEventListener).toBeCalled();
  });

  it("removeDimensionListener is called on unmount", () => {
    // eslint-disable-next-line no-shadow
    const Responsive = require("../src/responsive").default;

    const testInstance = TestRenderer.create(
      <Responsive>
        <ResponsiveContext.Consumer>
          {context => JSON.stringify(context)}
        </ResponsiveContext.Consumer>
      </Responsive>
    );

    testInstance.unmount();

    expect(Dimensions.removeEventListener).toBeCalled();
  });
};
