/* eslint-env jest */

import "react-native";
import { shallow } from "enzyme";
import React from "react";
import Pagination from "./pagination";

it("renders correctly", () => {
  const props = {
    count: 21,
    page: 1
  };

  const wrapper = shallow(<Pagination {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders compact above breakpoint", () => {
  const props = {
    count: 21,
    page: 1
  };

  const wrapper = shallow(<Pagination {...props} />);
  wrapper.setState({
    isCompact: true
  });
  wrapper.update();

  expect(wrapper).toMatchSnapshot();
});

it("renders prev link", () => {
  const props = {
    count: 41,
    page: 3
  };

  const wrapper = shallow(<Pagination {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders prev and next link", () => {
  const props = {
    count: 41,
    page: 2
  };

  const wrapper = shallow(<Pagination {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders prev link", () => {
  const props = {
    count: 41,
    page: 1
  };

  const wrapper = shallow(<Pagination {...props} />);
  expect(wrapper).toMatchSnapshot();
});

it("set compact above breakpoint", done => {
  const comp = new Pagination({
    count: 21,
    page: 1
  });

  comp.setState = ({ isCompact }) => {
    expect(isCompact).toEqual(true);

    return done();
  };

  comp.handleLayout({
    nativeEvent: {
      layout: {
        width: 800,
        height: 600
      }
    }
  });
});

it("set not compact below breakpoint", done => {
  const comp = new Pagination({
    count: 21,
    page: 1
  });

  comp.setState = ({ isCompact }) => {
    expect(isCompact).toEqual(false);

    return done();
  };

  comp.handleLayout({
    nativeEvent: {
      layout: {
        width: 400,
        height: 300
      }
    }
  });
});
