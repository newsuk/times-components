import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Card from "../../card";

const cardProps = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360,
  showImage: true
};

describe("Card test on web", () => {
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
    const noImageProps = Object.assign({}, cardProps, {
      image: null
    });
    const tree = renderer
      .create(
        <Card {...noImageProps}>
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

  it("re-renders when image uri changes", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>Some text</span>
      </Card>
    );

    component.setProps({
      image: { uri: "http://foo" }
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .props().uri
    ).toMatchSnapshot();
  });

  it("re-renders when image size changes", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>Some content</span>
      </Card>
    );

    component.setProps({
      imageSize: 620
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .props().uri
    ).toMatchSnapshot();
  });

  it("re-renders when is loading changes", () => {
    const component = shallow(
      <Card {...cardProps} isLoading>
        <span>Re-render me</span>
      </Card>
    );

    component.setProps({
      isLoading: false
    });

    expect(component.find("TimesImage").at(0)).toMatchSnapshot();
  });

  it("does not re-render fixed prop changes", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>Do not re-render me</span>
      </Card>
    );

    component.setProps({
      imageRatio: 2
    });

    expect(component.find("TimesImage").at(0)).toMatchSnapshot();
  });
});
