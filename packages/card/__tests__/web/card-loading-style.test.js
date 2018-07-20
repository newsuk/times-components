import React from "react";
import { Text } from "react-native";
import { mount } from "enzyme";
import { iterator } from "@times-components/test-utils";
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

const tests = [
  {
    name: "card loading state",
    test: () => {
      const wrapper = mount(
        <Card {...props} isLoading>
          <Text>Loading state</Text>
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
          <Text>Loading in reverse</Text>
        </Card>
      );

      jest.runTimersToTime();

      expect(wrapper).toMatchSnapshot();
    }
  }
];

iterator(tests);
