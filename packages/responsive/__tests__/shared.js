import React from "react";
import TestRenderer from "react-test-renderer";
import { setDimension } from "@times-components/test-utils/dimensions";
import Responsive, { ResponsiveContext } from "../src/responsive";

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

    setDimension({ height: 500, width: 1000 });
    expect(testInstance).toMatchSnapshot("after width update");
  });
};
