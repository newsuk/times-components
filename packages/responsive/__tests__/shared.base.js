import React from "react";
import TestRenderer from "react-test-renderer";
import Responsive, { ResponsiveContext } from "../src/responsive";

jest.mock("@times-components/utils", () => {
  // eslint-disable-next-line global-require
  const actualUtils = jest.requireActual("@times-components/utils");

  return {
    ...actualUtils,
    getDimensions: jest.fn(() => ({ height: 700, width: 500 })),
    addDimensionsListener: jest.fn(),
    removeDimensionsListener: jest.fn()
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
};
