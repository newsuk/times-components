/* eslint-env jest */

import { Dimensions } from "react-native";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";
import Card from "../card";
import props from "../fixtures/card-props.json";

Dimensions.get = jest.fn().mockReturnValue({
  width: 200
});

props.date = new Date("2017-07-01T14:32:00.000Z");

it("renders vertical by default", () => {
  const tree = renderer.create(<Card {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders loading vertical by default", () => {
  const tree = renderer.create(<Card loading />).toJSON();

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

it("renders horizontal above breakpoint", () => {
  Enzyme.configure({ adapter: new React16Adapter() });
  const wrapper = shallow(<Card {...props} />);
  wrapper.setState({
    isHorizontal: true
  });

  wrapper.update();
  expect(wrapper).toMatchSnapshot();
});

it("renders loading horizontal above breakpoint", () => {
  Enzyme.configure({ adapter: new React16Adapter() });
  const wrapper = shallow(<Card loading />);
  wrapper.setState({
    isHorizontal: true
  });

  wrapper.update();
  expect(wrapper).toMatchSnapshot();
});

it("renders component vertical by default", () => {
  const comp = new Card(...props);

  expect(comp.state.isHorizontal).toBeFalsy();
});

it("renders component vertical below breakpoint", done => {
  const comp = new Card(...props);

  comp.state.isHorizontal = true;
  comp.setState = ({ isHorizontal }) => {
    expect(isHorizontal).toBeFalsy();

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
});

it("renders component horizontal above breakpoint", done => {
  const comp = new Card(...props);

  comp.setState = ({ isHorizontal }) => {
    expect(isHorizontal).toBeTruthy();

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 640 } } });
});

it("don't set same card orientation", done => {
  const comp = new Card(...props);
  comp.state.isLoaded = true;
  comp.setState = ({ isHorizontal }) => {
    expect(isHorizontal).toBeTruthy();

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
  comp.handleLayout({ nativeEvent: { layout: { width: 640 } } });
});
