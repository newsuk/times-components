import React from "react";
import { Text } from "react-native";
import { iterator } from "@times-components/test-utils";
import Card from "../src/card";

const props = {
  image: {
    uri: "https://img.io/img"
  },
  imageRatio: 2 / 3,
  imageSize: 360,
  showImage: true
};

export default renderMethod => {
  jest.useFakeTimers();

  const tests = [
    {
      name: "card default state",
      test: () => {
        const output = renderMethod(
          <Card {...props}>
            <Text>A card</Text>
          </Card>
        );

        jest.runTimersToTime();

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card with reversed state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isReversed>
            <Text>A card in reverse</Text>
          </Card>
        );

        jest.runTimersToTime();

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading>
            <Text>Loading state</Text>
          </Card>
        );

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card reversed loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading isReversed>
            <Text>Loading in reverse</Text>
          </Card>
        );

        jest.runTimersToTime();

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
