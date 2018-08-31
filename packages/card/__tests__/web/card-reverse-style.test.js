import React from "react";
import { Text } from "react-native";
import { mount } from "enzyme";
import serializers from "./serializers";
import Card from "../../src/card";

const props = {
  highResSize: 600,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 30,
  showImage: true
};

jest.useFakeTimers();

serializers();

it("card with reversed layout", () => {
  const wrapper = mount(
    <Card {...props} isReversed>
      <Text>A card in reverse</Text>
    </Card>
  );

  jest.runTimersToTime();

  expect(wrapper).toMatchSnapshot();
});
