import { Text } from "react-native";
import React from "react";
import TestRenderer from "react-test-renderer";
import { Animations } from "../src/styleguide";

export default () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("a FadeIn animation wrapper component", () => {
    const testInstance = TestRenderer.create(
      <Animations.FadeIn>
        <Text>Hello World</Text>
      </Animations.FadeIn>
    );

    expect(testInstance.toJSON()).toMatchSnapshot();

    jest.runTimersToTime();

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
