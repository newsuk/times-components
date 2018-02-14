import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Styleguide from "../styleguide";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Styleguide />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
