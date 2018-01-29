import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Puff from "../puff";
import puffProps from "../fixtures/puff-props";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Puff {...puffProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
