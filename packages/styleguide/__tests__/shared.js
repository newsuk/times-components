import { Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { FadeIn } from "../styleguide";

module.exports = () => {
  it("should render a FadeIn animation wrapper component", () => {
    const tree = renderer
      .create(
        <FadeIn>
          <Text>Hello World</Text>
        </FadeIn>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
