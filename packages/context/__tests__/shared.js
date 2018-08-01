import React from "react";
import TestRenderer from "react-test-renderer";
import Context from "../src/context";
import defaults from "../src/defaults";

export default () => {
  it("with default scale", () => {
    const { theme: { scale: defaultScale } } = defaults;
    const testInstance = TestRenderer.create(
      <Context.Consumer>{context => context.theme.scale}</Context.Consumer>
    );

    expect(testInstance.toJSON()).toBe(defaultScale);
  });

  it("with inline scale", () => {
    const scale = "large";
    const testInstance = TestRenderer.create(
      <Context.Provider value={{ theme: { scale } }}>
        <Context.Consumer>{context => context.theme.scale}</Context.Consumer>
      </Context.Provider>
    );

    expect(testInstance.toJSON()).toBe(scale);
  });
};
