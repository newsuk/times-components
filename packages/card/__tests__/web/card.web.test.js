/* eslint-env jest */

import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Card from "../../card";
import props from "../../fixtures/card-props.json";

Enzyme.configure({ adapter: new React16Adapter() });

describe("Card test on web", () => {
  props.date = new Date("2017-07-01T14:32:00.000Z");

  it("renders", () => {
    const tree = renderer.create(<Card {...props} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders loading state", () => {
    const tree = renderer.create(<Card {...props} isLoading />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image", () => {
    const noImageProps = Object.assign({}, props, {
      image: null
    });
    const tree = renderer.create(<Card {...noImageProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("renders without image url", () => {
    const noImageProps = Object.assign({}, props, {
      image: {
        uri: null
      }
    });
    const tree = renderer.create(<Card {...noImageProps} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("re-renders when image uri changes", () => {
    const component = shallow(<Card {...props} />);

    component.setProps({
      image: { uri: "http://foo " }
    });

    expect(
      component
        .find("TimesImage")
        .at(0)
        .props().uri
    ).toMatchSnapshot();
  });

  it("re-renders when image size changes", () => {
    const component = shallow(<Card {...props} />);

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
    const component = shallow(<Card {...props} isLoading />);

    component.setProps({
      isLoading: false
    });

    expect(component.find("TimesImage").at(0)).toMatchSnapshot();
  });

  it("does not re-render fixed prop changes", () => {
    const component = shallow(<Card {...props} />);

    component.setProps({
      publication: "TIMES"
    });

    expect(
      component.find("ArticleSummary").props().publication
    ).toMatchSnapshot();
  });
});
