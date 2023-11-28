import React from "react";
import { TcText } from "@times-components/utils";
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
      <TcText>A card in reverse</TcText>
    </Card>
  );

  jest.runTimersToTime();

  expect(wrapper).toMatchSnapshot();
});
