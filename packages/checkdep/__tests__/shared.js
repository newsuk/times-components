import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Checkdep from "../checkdep";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Checkdep />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
