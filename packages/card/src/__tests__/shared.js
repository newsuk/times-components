import React from "react";
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
        <span>A card</span>
      </Card>
    );

    expect(component).toMatchSnapshot("1. Renders default layout");
  });

  it("should render without an image when null", () => {
    const component = shallow(
      <Card {...props} image={null}>
        <span>No image</span>
      </Card>
    );

    expect(component).toMatchSnapshot("2. Renders without an image (null)");
  });

  it("should render without an image when showImage is false", () => {
    const component = shallow(
      <Card {...props} showImage={false}>
        <span>No image</span>
      </Card>
    );

    expect(component).toMatchSnapshot(
      "3. Renders without an image (showImage is false)"
    );
  });

  it("should render without an image when url is null", () => {
    const component = shallow(
      <Card {...props} image={{ uri: null }}>
        <span>No URL</span>
      </Card>
    );

    expect(component).toMatchSnapshot(
      "4. Renders without an image (uri is null)"
    );
  });

  it("should render with reversed layout", () => {
    const component = shallow(
      <Card {...props} isReversed>
        <span>A card</span>
      </Card>
    );

    expect(component).toMatchSnapshot("5. Renders with a reversed layout");
  });

  it("should render with reversed layout and no image", () => {
    const component = shallow(
      <Card {...props} isReversed showImage={false}>
        <span>A card</span>
      </Card>
    );

    expect(component).toMatchSnapshot(
      "6. Renders with a reversed layout with no image"
    );
  });

  it("should render a loading state", () => {
    const component = shallow(
      <Card {...props} isLoading>
        <span>Loading state</span>
      </Card>
    );

    expect(component).toMatchSnapshot("7. Renders a loading state");
  });

  it("should render a loading component", () => {
    const component = shallow(
      <Loading {...props}>
        <span>A card</span>
      </Loading>
    );

    expect(component).toMatchSnapshot("8. Renders a loading component");
  });

  it("should render a loading card with no image", () => {
    const component = shallow(
      <Loading {...props} showImage={false}>
        <span>A card</span>
      </Loading>
    );

    expect(component).toMatchSnapshot(
      "9. Render a loading component with no image"
    );
  });

  it("should render a reversed loading component", () => {
    const component = shallow(
      <Loading {...props} isReversed>
        <span>A card</span>
      </Loading>
    );

    expect(component).toMatchSnapshot(
      "10. Render a reversed loading component"
    );
  });

  it("should render a reversed loading component with no image", () => {
    const component = shallow(
      <Loading {...props} isReversed showImage={false}>
        <span>A card</span>
      </Loading>
    );

    expect(component).toMatchSnapshot(
      "11. Render a reversed loading component with no image"
    );
  });

  it("12. should re-render when image uri changes", () => {
    const component = shallow(
      <Card {...props}>
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
    ).toEqual(`${testUri}&resize=${props.imageSize}`);
  });

  it("13. should re-render when image size changes", () => {
    const component = shallow(
      <Card {...props}>
        <span>Some content</span>
      </Card>
    );

    component.setProps({
      imageSize: null
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .props().uri
    ).toEqual(`${props.image.uri}`);
  });

  it("should re-render when loading state changes", () => {
    const component = shallow(
      <Card {...props} isLoading>
        <span>Re-render me</span>
      </Card>
    );

    component.setProps({
      isLoading: false
    });

    expect(component).toMatchSnapshot(
      "14. Re-renders when loading state changes"
    );
  });

  it("should not re-render when image ratio changes", () => {
    const component = shallow(
      <Card {...props}>
        <span>Do not re-render me</span>
      </Card>
    );

    component.setProps({
      imageRatio: 2
    });

    expect(component).toMatchSnapshot(
      "15. Does not re-render when image ratio changes"
    );
  });
};
