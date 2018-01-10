/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new React16Adapter() });

export default Pagination => () => {
  it("renders correctly", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders results message", () => {
    const props = {
      count: 21,
      page: 1
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it("renders with hidden results", () => {
    const props = {
      count: 21,
      page: 1,
      hideResults: true
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it("renders with hidden topKeyline", () => {
    const props = {
      count: 21,
      page: 1,
      hideTopKeyline: true
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it("renders with hidden bottomKeyline", () => {
    const props = {
      count: 21,
      page: 1,
      hideBottomKeyline: true
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();

    expect(component).toMatchSnapshot();
  });

  it("renders prev link", () => {
    const props = {
      count: 41,
      page: 3
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders prev and next link", () => {
    const props = {
      count: 41,
      page: 2
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders next link", () => {
    const props = {
      count: 41,
      page: 1
    };

    const component = renderer.create(<Pagination {...props} />).toJSON();

    expect(component).toMatchSnapshot();
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
