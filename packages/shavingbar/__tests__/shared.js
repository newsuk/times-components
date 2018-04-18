import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Shavingbar from "../shavingbar";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Shavingbar />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
