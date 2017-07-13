/* eslint-env jest */

import "react-native";
import { shallow } from "enzyme";
import React from "react";
import Card from "../card";
import props from "../fixtures/card-props.json";
import withIntl from "./with-intl";

it("renders horizontal by default", () => {
  const tree = withIntl(<Card {...props} />).toJSON();

  expect(tree).toMatchSnapshot();
});

it("renders vertical above breakpoint", () => {
  const wrapper = shallow(<Card {...props} />);
  wrapper.setState({
    isHorizontal: false
  });

  expect(wrapper).toMatchSnapshot();
});

it("renders component horizontal by default", () => {
  const comp = new Card(...props);

  expect(comp.state.isHorizontal).toBeTruthy();
});

it("renders component vertical below breakpoint", done => {
  const comp = new Card(...props);

  comp.setState = ({ isHorizontal }) => {
    expect(isHorizontal).toBeFalsy();

    return done();
  };

  comp.handleLayout({ nativeEvent: { layout: { width: 320 } } });
});

it("renders component horizontal above breakpoint", () => {
  const comp = new Card(...props);

  comp.handleLayout({ nativeEvent: { layout: { width: 640 } } });
  expect(comp.state.isHorizontal).toBeTruthy();
});
