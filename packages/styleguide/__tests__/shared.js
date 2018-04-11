import { Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { Animations } from "../src/styleguide";

export default () => {
  it("should render a FadeIn animation wrapper component", () => {
    const tree = renderer
      .create(
        <Animations.FadeIn>
          <Text>Hello World</Text>
        </Animations.FadeIn>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
