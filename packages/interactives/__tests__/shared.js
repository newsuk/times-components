import React from "react";
import TestRenderer from "react-test-renderer";
import Interactives from "../src/interactives";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <Interactives />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
