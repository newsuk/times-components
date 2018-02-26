import React from "react";
import { shallow, mount } from "enzyme";
import Card from "../../card";

const cardProps = {
  childRatio: 2.7,
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 1.5,
  imageSize: 360,
  showImage: true,
  tabletChildRatio: 2.7
};

describe("Card tests on web", () => {
  it("should render a card", () => {
    const component = shallow(
      <Card {...cardProps}>
        <span>A card</span>
      </Card>
    );

    expect(component).toMatchSnapshot("1. Render a Card");
  });

  it("should render the loading state", () => {
    const component = mount(
      <Card {...cardProps} isLoading>
        <span>Loading state</span>
      </Card>
    );

    expect(component).toMatchSnapshot("2. Render the loading state");
  });

  it("should render without an image", () => {
    const noImageProps = Object.assign({}, cardProps, {
      image: null
    });
    const component = shallow(
      <Card {...noImageProps}>
        <span>No image</span>
      </Card>
    );

    expect(component).toMatchSnapshot("3. Renders without an image");
  });

  it("should render without image url", () => {
    const noImageProps = Object.assign({}, cardProps, {
      image: {
        uri: null
      }
    });
    const component = shallow(
      <Card {...noImageProps}>
        <span>No URL</span>
      </Card>
    );

    expect(component).toMatchSnapshot("4. Renders without an image URL");
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
});
