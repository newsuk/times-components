import React from "react";
import { Text } from "react-native";
import { mount } from "enzyme";
import serializers from "./serializers";
import Card from "../../src/card";

const props = {
  image: {
    uri: "https://img.io/img"
  },
  imageRatio: 2 / 3,
  imageSize: 360,
  showImage: true
};

describe("web", () => {
  jest.useFakeTimers();

  serializers();

  it("should render a loading state", () => {
    const output = mount(
      <Card {...props} isLoading>
        <Text>Loading state</Text>
      </Card>
    );

    expect(output).toMatchSnapshot("1. should render a loading state");
  });

  it("should render a reversed loading component", () => {
    const output = mount(
      <Card {...props} isLoading isReversed>
        <Text>Loading in reverse</Text>
      </Card>
    );

    jest.runTimersToTime();

    expect(output).toMatchSnapshot(
      "2. should render a reversed loading component"
    );
  });
});
