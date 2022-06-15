import React from "react";
import { TcText } from "@times-components/utils";
import { iterator } from "@times-components/test-utils";
import Card from "../src/card";

const props = {
  highResSize: 900,
  imageRatio: 2 / 3,
  imageUri: "https://img.io/img",
  lowResSize: 25,
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
            <TcText>A card</TcText>
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
            <TcText>A card in reverse</TcText>
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
            <TcText>Loading state</TcText>
          </Card>
        );

        jest.runTimersToTime();

        expect(output).toMatchSnapshot();
      }
    },
    {
      name: "card reversed loading state",
      test: () => {
        const output = renderMethod(
          <Card {...props} isLoading isReversed>
            <TcText>Loading in reverse</TcText>
          </Card>
        );

        jest.runTimersToTime();

        expect(output).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
