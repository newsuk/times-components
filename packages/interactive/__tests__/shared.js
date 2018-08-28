import React from "react";
import TestRenderer from "react-test-renderer";
import Interactive from "../src/interactive";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <Interactive />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
