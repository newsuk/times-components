import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
import Card from "../card";
import Loading from "../card-loading";

const props = {
  image: {
    uri:
      "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12"
  },
  imageRatio: 2 / 3,
  imageSize: 360,
  showImage: true
};

export default () => {
  it("should render default layout", () => {
    const component = shallow(
      <Card {...props}>
        <Text>A card</Text>
      </Card>
    );

    expect(component).toMatchSnapshot("1. Renders default layout");
  });

  it("should render without an image when null", () => {
    const component = shallow(
      <Card {...props} image={null}>
        <Text>No image</Text>
      </Card>
    );

    expect(component).toMatchSnapshot("2. Renders without an image (null)");
  });

  it("should render without an image when showImage is false", () => {
    const component = shallow(
      <Card {...props} showImage={false}>
        <Text>No image</Text>
      </Card>
    );

    expect(component).toMatchSnapshot(
      "3. Renders without an image (showImage is false)"
    );
  });

  it("should render without an image when url is null", () => {
    const component = shallow(
      <Card {...props} image={{ uri: null }}>
        <Text>No URL</Text>
      </Card>
    );

    expect(component).toMatchSnapshot(
      "4. Renders without an image (uri is null)"
    );
  });

  it("should render with reversed layout", () => {
    const component = shallow(
      <Card {...props} isReversed>
        <Text>A card</Text>
      </Card>
    );

    expect(component).toMatchSnapshot("5. Renders with a reversed layout");
  });

  it("should render with reversed layout and no image", () => {
    const component = shallow(
      <Card {...props} isReversed showImage={false}>
        <Text>A card</Text>
      </Card>
    );

    expect(component).toMatchSnapshot(
      "6. Renders with a reversed layout with no image"
    );
  });

  it("should render a loading state", () => {
    const component = shallow(
      <Card {...props} isLoading>
        <Text>Loading state</Text>
      </Card>
    );

    expect(component).toMatchSnapshot("7. Renders a loading state");
  });

  it("should render a loading component", () => {
    const component = shallow(
      <Loading {...props}>
        <Text>A card</Text>
      </Loading>
    );

    expect(component).toMatchSnapshot("8. Renders a loading component");
  });

  it("should render a loading card with no image", () => {
    const component = shallow(
      <Loading {...props} showImage={false}>
        <Text>A card</Text>
      </Loading>
    );

    expect(component).toMatchSnapshot(
      "9. Render a loading component with no image"
    );
  });

  it("should render a reversed loading component", () => {
    const component = shallow(
      <Loading {...props} isReversed>
        <Text>A card</Text>
      </Loading>
    );

    expect(component).toMatchSnapshot(
      "10. Render a reversed loading component"
    );
  });

  it("should render a reversed loading component with no image", () => {
    const component = shallow(
      <Loading {...props} isReversed showImage={false}>
        <Text>A card</Text>
      </Loading>
    );

    expect(component).toMatchSnapshot(
      "11. Render a reversed loading component with no image"
    );
  });

  it("should not re-render when imageRatio prop is changed", () => {
    const component = shallow(
      <Card {...props}>
        <Text>Do not re-render me</Text>
      </Card>
    );

    expect(component).toMatchSnapshot();

    component.setProps({
      imageRatio: 16 / 9
    });

    expect(component).toMatchSnapshot();
  });

  it("should re-render when image uri changes", () => {
    const component = shallow(
      <Card {...props}>
        <Text>Some text</Text>
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
        .prop("uri")
    ).toEqual(`${testUri}&resize=${props.imageSize}`);
  });

  it("should re-render when image size changes", () => {
    const component = shallow(
      <Card {...props}>
        <Text>Some content</Text>
      </Card>
    );

    expect(
      component
        .find("TimesImage")
        .at(0)
        .prop("uri")
    ).toEqual(`${props.image.uri}&resize=${props.imageSize}`);

    component.setProps({
      imageSize: null
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .prop("uri")
    ).toEqual(`${props.image.uri}`);
  });

  it("should re-render when loading state changes", () => {
    const component = shallow(
      <Card {...props} isLoading>
        <Text>Re-render me</Text>
      </Card>
    );

    expect(component.name()).toEqual("Loading");

    component.setProps({
      isLoading: false
    });

    expect(component.name()).toEqual("FadeIn");
  });
};
