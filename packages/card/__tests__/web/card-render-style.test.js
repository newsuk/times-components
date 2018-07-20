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

jest.useFakeTimers();

serializers();

it("card with default layout", () => {
  const wrapper = mount(
    <Card {...props}>
      <Text>A card</Text>
    </Card>
  );

  jest.runTimersToTime();

  expect(wrapper).toMatchSnapshot();
});
