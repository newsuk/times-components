import "react-native";
import React from "react";
import renderer from "react-test-renderer";
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

module.exports = () => {
  it("renders with specific styles", () => {
    const tree = renderer
      .create(<Caption text={captionText} credits={credits} style={style} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
