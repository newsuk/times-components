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

  it("should render with reversed layout", () => {
    const output = mount(
      <Card {...props} isReversed>
        <Text>A card in reverse</Text>
      </Card>
    );

    jest.runTimersToTime();

    expect(output).toMatchSnapshot("1. should render with reversed layout");
  });
});
