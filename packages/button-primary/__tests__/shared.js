import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ButtonPrimary from "../src/button-primary";

module.exports = () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ButtonPrimary />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
