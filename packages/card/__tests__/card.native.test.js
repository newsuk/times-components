import { Dimensions, Text } from "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
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

  it("should render a card", () => {
    const tree = renderer
      .create(
        <Card {...cardProps}>
          <Text>Some text</Text>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render the loading state", () => {
    const tree = renderer
      .create(
        <Card {...cardProps} isLoading>
          <Text>A loading state</Text>
        </Card>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should render without an image", () => {
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

  it("should render without image url", () => {
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

  it("should re-render when image uri changes", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>Some text</span>
      </Card>
    );

    const testUri = "http://foo";

    component.setProps({
      image: { uri: testUri }
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .props().uri
    ).toEqual(`${testUri}&resize=${cardProps.imageSize}`);
  });

  it("should re-render when image size changes", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>Some content</span>
      </Card>
    );

    const testImageSize = 620;

    component.setProps({
      imageSize: testImageSize
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .props().uri
    ).toEqual(`${cardProps.image.uri}&resize=${testImageSize}`);
  });

  it("should re-render after showing the loading state", () => {
    const component = shallow(
      <Card {...cardProps} isLoading>
        <span>Re-render me</span>
      </Card>
    );

    component.setProps({
      isLoading: false
    });

    expect(component).toMatchSnapshot(
      "5. Re-renders after showing the loading state"
    );
  });

  it("should not re-render when image ratio changes", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>Do not re-render me</span>
      </Card>
    );

    component.setProps({
      imageRatio: 2
    });

    expect(component).toMatchSnapshot(
      "6. Renders Card normally and does not re-render"
    );
  });
};
