import React from "react";
import TestRenderer from "react-test-renderer";
import FixtureGenerator from "../src/fixture-generator";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <FixtureGenerator />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
