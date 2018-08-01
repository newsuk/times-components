import React from "react";
import TestRenderer from "react-test-renderer";
import Theme from "../src/theme";
import themeDefaults from "../src/defaults";

export default () => {
  it("with default values", () => {
    const { scale: defaultScale } = themeDefaults;
    const testInstance = TestRenderer.create(
      <Theme.Consumer>{theme => theme.scale}</Theme.Consumer>
    );

    expect(testInstance.toJSON()).toBe(defaultScale);
  });

  it("with inline values", () => {
    const scale = "large";
    const testInstance = TestRenderer.create(
      <Theme.Provider value={{ scale }}>
        <Theme.Consumer>{theme => theme.scale}</Theme.Consumer>
      </Theme.Provider>
    );

    expect(testInstance.toJSON()).toBe(scale);
  });
};
