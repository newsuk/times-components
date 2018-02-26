import React from "react";
// import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Card from "../../card";

const cardProps = {
  childRatio: 5.7,
  image: {
    isShowing: true,
    ratio: 1.5,
    size: 360,
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  }
};

describe("Card tests on web", () => {
  it("renders", () => {
    const tree = renderer
      .create(
        <Card {...cardProps}>
          <span>A card</span>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders loading state", () => {
    const tree = renderer
      .create(
        <Card {...cardProps} isLoading>
          <span>A loading state</span>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image", () => {
    const tree = renderer
      .create(
        <Card childRatio={5.7}>
          <span>No image</span>
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
          <span>No URL</span>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
