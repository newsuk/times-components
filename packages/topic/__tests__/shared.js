import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Topic from "../src/topic";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Topic />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
