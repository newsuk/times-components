import React from "react";
import TestRenderer from "react-test-renderer";
import Caption from "../src/caption";

const captionText = "Some caption text goes in here";
const credits = "Just credits";
const style = {
  container: {
    backgroundColor: "red"
  },
  text: {
    color: "green"
  }
};

export default () => {
  it("renders with specific styles", () => {
    const testInstance = TestRenderer.create(
      <Caption text={captionText} credits={credits} style={style} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot(
      "1. renders with specific styles"
    );
  });
};
