/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Icons from "../icons";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icons />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
