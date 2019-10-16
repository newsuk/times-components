import React from "react";
import TestRenderer from "react-test-renderer";
import Responsive, { ResponsiveContext } from "../src/responsive";

jest.mock('react-native', () => {
  let dims = { width: 480, height: 640, fontScale: 1.0 }
  const RN = jest.requireActual('react-native')
  return {
    ...RN,
    Dimensions: {
      get: () => dims,
      set: ({window}) => dims = window,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    }
  }
})

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
