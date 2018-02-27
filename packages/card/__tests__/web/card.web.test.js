import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import "jest-styled-components";
import Card from "../../card";

const cardProps = {
  childRatio: 2.7,
  image: {
    uri: "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360,
  showImage: true
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
        <Card>
          <span>No image</span>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders with default image size", () => {

    const tree = renderer
      .create(
        <Card {...cardProps} imageSize={undefined}>
          <span>No image</span>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("rerenders an image when props change", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>No image</span>
      </Card>
    );

    component.setProps({
      image: {
        uri: "http://nextimage"
      }
    });

    expect(component).toMatchSnapshot();
  });
});
