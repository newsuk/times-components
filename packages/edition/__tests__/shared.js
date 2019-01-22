import React from "react";
import TestRenderer from "react-test-renderer";
import Edition from "../src/edition";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <Edition />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
