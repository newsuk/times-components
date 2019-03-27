import React from "react";
import TestRenderer from "react-test-renderer";
import StarButton from "../src/star-button";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <StarButton />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
