/* eslint-env jest */

import "react-native";
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import Card from "../card";
import props from "../fixtures/card-props.json";

it("renders vertical by default", () => {
  const tree = renderer.create(<Card {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders horizontal above breakpoint", () => {
  const wrapper = shallow(<Card {...props} />);
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

  comp.setState = ({ isHorizontal }) => {
    expect(isHorizontal).toBeTruthy();

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
  comp.handleLayout({ nativeEvent: { layout: { width: 640 } } });
});
