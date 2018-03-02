import { Dimensions, Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Card from "../card";

const cardProps = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360,
  showImage: true
};

export default () => {
  Dimensions.get = jest.fn().mockReturnValue({
    width: 200
  });

  it("renders vertical by default", () => {
    const tree = renderer
      .create(
        <Card {...cardProps}>
          <Text>Some text</Text>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders loading state", () => {
    const tree = renderer
      .create(
        <Card {...cardProps} isLoading>
          <Text>A loading state</Text>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image", () => {
    const noImageProps = Object.assign({}, cardProps, {
      image: null
    });
    const tree = renderer
      .create(
        <Card {...noImageProps}>
          <Text>No image</Text>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image url", () => {
    const noImageProps = Object.assign({}, cardProps, {
      image: {
        uri: null
      }
    });
    const tree = renderer
      .create(
        <Card {...noImageProps}>
          <Text>No image URL</Text>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
