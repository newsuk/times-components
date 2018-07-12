import React from "react";
import TestRenderer from "react-test-renderer";
import KeyFacts from "../src/key-facts";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(<KeyFacts />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
