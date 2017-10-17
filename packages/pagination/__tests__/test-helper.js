/* eslint-env jest */

import "react-native";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new React16Adapter() });

export default Pagination => () => {
  it("renders correctly", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />).dive();
    expect(component).toMatchSnapshot();
  });

  it("renders with hidden results above breakpoint", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />).dive();
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

    const component = shallow(<Pagination {...props} />).dive();
    expect(component).toMatchSnapshot();
  });

  it("renders prev and next link", () => {
    const props = {
      count: 41,
      page: 2
    };

    const component = shallow(<Pagination {...props} />).dive();
    expect(component).toMatchSnapshot();
  });

  it("renders prev link", () => {
    const props = {
      count: 41,
      page: 1
    };

    const component = shallow(<Pagination {...props} />).dive();
    expect(component).toMatchSnapshot();
  });

  it("set results hidden above breakpoint", done => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />)
      .dive()
      .instance();

    component.setState = ({ absolutePosition }) => {
      expect(absolutePosition).toEqual(true);

      return done();
    };

    component.handleLayout({
      nativeEvent: {
        layout: {
          width: 800,
          height: 600
        }
      }
    });
  });

  it("set results showing below breakpoint", done => {
    const props = {
      count: 21,
      page: 1
    };

    const component = shallow(<Pagination {...props} />)
      .dive()
      .instance();

    component.setState = ({ absolutePosition }) => {
      expect(absolutePosition).toEqual(false);

      return done();
    };

    component.handleLayout({
      nativeEvent: {
        layout: {
          width: 400,
          height: 300
        }
      }
    });
  });

  it("tracks next page interaction", () => {
    const stream = jest.fn();
    const component = shallow(<Pagination count={21} page={1} />, {
      context: { tracking: { analytics: stream } }
    });

    component
      .dive()
      .find("Link")
      .simulate("press");

    expect(stream).toHaveBeenCalledWith({
      component: "Pagination",
      action: "Pressed",
      attrs: {
        direction: "next",
        destinationPage: 2
      }
    });
  });

  it("tracks previous page interaction", () => {
    const stream = jest.fn();
    const component = shallow(<Pagination count={21} page={2} />, {
      context: { tracking: { analytics: stream } }
    });

    component
      .dive()
      .find("Link")
      .simulate("press");

    expect(stream).toHaveBeenCalledWith({
      component: "Pagination",
      action: "Pressed",
      attrs: {
        direction: "previous",
        destinationPage: 1
      }
    });
  });
};
