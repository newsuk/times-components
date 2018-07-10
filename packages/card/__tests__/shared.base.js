import React from "react";
import { Text } from "react-native";
import { shallow } from "enzyme";
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
  // magic to stop the React Native Animated library from dying, as each test kicks off another animation that uses timing
  jest.useFakeTimers();

  it("should render the default layout", () => {
    const output = renderMethod(
      <Card {...props}>
        <Text>A card</Text>
      </Card>
    );

    expect(output).toMatchSnapshot("1. should render the default layout");
  });

  it("should pass an empty state to the image component", () => {
    const output = renderMethod(
      <Card {...props} image={null}>
        <Text>A card with an empty image</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "2. should pass an empty state to the image component"
    );
  });

  it("should render without an image when showImage is false", () => {
    const output = renderMethod(
      <Card {...props} showImage={false}>
        <Text>No image</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "4. should render without an image when showImage is false"
    );
  });

  it("should pass an empty state to the image component when uri is null", () => {
    const output = renderMethod(
      <Card {...props} image={{ uri: null }}>
        <Text>No URI</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "5. should pass an empty state to the image component when uri is null"
    );
  });

  it("should render with reversed layout", () => {
    const output = renderMethod(
      <Card {...props} isReversed>
        <Text>A card in reverse</Text>
      </Card>
    );

    expect(output).toMatchSnapshot("6. should render with reversed layout");
  });

  it("should render with reversed layout and no image", () => {
    const output = renderMethod(
      <Card {...props} isReversed showImage={false}>
        <Text>A card in reverse with no image</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "7. should render with reversed layout and no image"
    );
  });

  it("should render a loading state", () => {
    const output = renderMethod(
      <Card {...props} isLoading>
        <Text>Loading state</Text>
      </Card>
    );

    expect(output).toMatchSnapshot("8. should render a loading state");
  });

  it("should render a loading card with no image", () => {
    const output = renderMethod(
      <Card {...props} isLoading showImage={false}>
        <Text>Loading with no image</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "10. should render a loading card with no image"
    );
  });

  it("should render a reversed loading component", () => {
    const output = renderMethod(
      <Card {...props} isLoading isReversed>
        <Text>Loading in reverse</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "11. should render a reversed loading component"
    );
  });

  it("should render a reversed loading component with no image", () => {
    const output = renderMethod(
      <Card {...props} isLoading isReversed showImage={false}>
        <Text>Loading in reverse with no image</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "12. should render a reversed loading component with no image"
    );
  });

  it("should not re-render when imageRatio prop is changed", () => {
    const output = shallow(
      <Card {...props}>
        <Text>Do not re-render me</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "13. should not re-render when imageRatio prop is changed"
    );

    output.setProps({
      imageRatio: 16 / 9
    });

    expect(output).toMatchSnapshot(
      "13. should not re-render when imageRatio prop is changed"
    );
  });

  it("should re-render when image uri changes", () => {
    const output = shallow(
      <Card {...props}>
        <Text>Some text</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "14. should re-render when image uri changes"
    );

    output.setProps({
      image: { uri: "http://foo" }
    });

    expect(output).toMatchSnapshot(
      "14. should re-render when image uri changes"
    );
  });

  it("should re-render when image size changes", () => {
    const output = shallow(
      <Card {...props}>
        <Text>Some content</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "15. should re-render when image size changes"
    );

    output.setProps({
      imageSize: null
    });

    expect(output).toMatchSnapshot(
      "15. should re-render when image size changes"
    );
  });

  it("should re-render when loading state changes", () => {
    const output = shallow(
      <Card {...props} isLoading>
        <Text>Re-render me</Text>
      </Card>
    );

    expect(output).toMatchSnapshot(
      "16. should re-render when loading state changes"
    );

    output.setProps({
      isLoading: false
    });

    expect(output).toMatchSnapshot(
      "16. should re-render when loading state changes"
    );
  });
};
