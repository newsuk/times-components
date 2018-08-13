import React from "react";
import TestRenderer from "react-test-renderer";
import { scales } from "@times-components/styleguide";
import Context from "../src/context";

export default () => {
  it("with default values", () => {
    const testInstance = TestRenderer.create(
      <Context.Consumer>{context => JSON.stringify(context)}</Context.Consumer>
    );

    expect(testInstance).toMatchSnapshot();
  });

  it("with inline values", () => {
    const scale = scales.large;
    const sectionColour = "#FFFFFF";
    const testInstance = TestRenderer.create(
      <Context.Provider value={{ theme: { scale, sectionColour } }}>
        <Context.Consumer>
          {context => JSON.stringify(context)}
        </Context.Consumer>
      </Context.Provider>
    );

    expect(testInstance).toMatchSnapshot();
  });
};
