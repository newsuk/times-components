/* eslint-env jest */

import "react-native";
import React from "react";
import { shallow } from "enzyme";

export default Pagination => () => {
  it("renders correctly", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("renders with hidden results above breakpoint", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />);
    component.setState({
      hideResults: true
    });
    component.update();

    expect(component).toMatchSnapshot();
  });

  it("renders prev link", () => {
    const props = {
      count: 41,
      page: 3
    };

    const component = shallow(<Pagination {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("renders prev and next link", () => {
    const props = {
      count: 41,
      page: 2
    };

    const component = shallow(<Pagination {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("renders prev link", () => {
    const props = {
      count: 41,
      page: 1
    };

    const component = shallow(<Pagination {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("set results hidden above breakpoint", done => {
    const comp = new Pagination({
      count: 21,
      page: 1
    });

    comp.setState = ({ absolutePosition }) => {
      expect(absolutePosition).toEqual(true);

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

  it("set results showing below breakpoint", done => {
    const comp = new Pagination({
      count: 21,
      page: 1
    });

    comp.setState = ({ absolutePosition }) => {
      expect(absolutePosition).toEqual(false);

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
};
