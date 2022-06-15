import React from "react";
import { TcText } from "@times-components/utils";
import { mount } from "enzyme";
import { iterator } from "@times-components/test-utils";
import serializers from "./serializers";
import Card from "../../src/card";

const props = {
  highResSize: 800,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 60,
  showImage: true
};

jest.useFakeTimers();

serializers();

const tests = [
  {
    name: "card loading state",
    test: () => {
      const wrapper = mount(
        <Card {...props} isLoading>
          <TcText>Loading state</TcText>
        </Card>
      );

      expect(wrapper).toMatchSnapshot();
    }
  },
  {
    name: "card with reversed loading state",
    test: () => {
      const wrapper = mount(
        <Card {...props} isLoading isReversed>
          <TcText>Loading in reverse</TcText>
        </Card>
      );

      jest.runTimersToTime();

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
