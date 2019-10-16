import React from "react";
import TestRenderer from "react-test-renderer";
import HomePage from "../src/home-page";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(<HomePage />);

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
