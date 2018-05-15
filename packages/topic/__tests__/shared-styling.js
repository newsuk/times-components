import "react-native";
import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";
import Topic from "../src/topic";

export default () => {
  it("should render styling correctly", () => {
    const tree = renderer.create(<Topic name="Animals" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
