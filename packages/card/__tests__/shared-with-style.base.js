import React from "react";
import { Text } from "react-native";
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

  it("should render the default layout", () => {
    const output = renderMethod(
      <Card {...props}>
        <Text>A card</Text>
      </Card>
    );

    jest.runTimersToTime();

    expect(output).toMatchSnapshot("1. should render the default layout");
  });

  it("should render with reversed layout", () => {
    const output = renderMethod(
      <Card {...props} isReversed>
        <Text>A card in reverse</Text>
      </Card>
    );

    jest.runTimersToTime();

    expect(output).toMatchSnapshot("2. should render with reversed layout");
  });

  it("should render a loading state", () => {
    const output = renderMethod(
      <Card {...props} isLoading>
        <Text>Loading state</Text>
      </Card>
    );

    expect(output).toMatchSnapshot("3. should render a loading state");
  });

  it("should render a reversed loading component", () => {
    const output = renderMethod(
      <Card {...props} isLoading isReversed>
        <Text>Loading in reverse</Text>
      </Card>
    );

    jest.runTimersToTime();

    expect(output).toMatchSnapshot(
      "4. should render a reversed loading component"
    );
  });
};
