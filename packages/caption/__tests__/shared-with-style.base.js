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
  it("caption with specific styles", () => {
    const testInstance = TestRenderer.create(
      <Caption credits={credits} style={style} text={captionText} />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
