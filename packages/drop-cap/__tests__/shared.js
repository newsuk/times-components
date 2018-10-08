import React from "react";
import TestRenderer from "react-test-renderer";
import DropCap from "../src/drop-cap";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(<DropCap />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
