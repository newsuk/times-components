/* eslint-env jest */

import "react-native";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new React16Adapter() });

export default Pagination => () => {
  it("renders correctly", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />);
    expect(component).toMatchSnapshot();
  });

  it("renders compact above breakpoint", () => {
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

  it("set compact above breakpoint", done => {
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

  it("set not compact below breakpoint", done => {
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
