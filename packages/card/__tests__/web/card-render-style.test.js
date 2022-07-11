import React from "react";
import { TcText } from "@times-components/utils";
import { mount } from "enzyme";
import serializers from "./serializers";
import Card from "../../src/card";

const props = {
  highResSize: 100,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 50,
  showImage: true
};

jest.useFakeTimers();

serializers();

it("card with default layout", () => {
  const wrapper = mount(
    <Card {...props}>
      <TcText>A card</TcText>
    </Card>
  );

  jest.runTimersToTime();

  expect(wrapper).toMatchSnapshot();
});
