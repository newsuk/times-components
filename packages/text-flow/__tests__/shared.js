import React from "react";
import TestRenderer from "react-test-renderer";
import TextFlow from "../src/text-flow";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <TextFlow />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
