import "react-native";
import "jest-styled-components";
import React from "react";
import renderer from "react-test-renderer";
import TopicHead from "../src/topic-head";

export default () => {
  it("should render styling correctly", () => {
    const tree = renderer.create(<TopicHead name="Animals" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
};
