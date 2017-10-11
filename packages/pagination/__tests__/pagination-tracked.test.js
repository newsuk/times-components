/* eslint-env jest */
import React from "react";
import Enzyme, { shallow } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";
import { PaginationTracked } from "../pagination";

Enzyme.configure({ adapter: new React16Adapter() });

describe("PaginationTracked", () => {
  it("tracks next page interaction", () => {
    const stream = jest.fn();
    const component = shallow(<PaginationTracked count={21} page={1} />, {
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
        direction: "forward",
        nextPage: 2
      }
    });
  });

  it("tracks previous page interaction", () => {
    const stream = jest.fn();
    const component = shallow(<PaginationTracked count={21} page={2} />, {
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
        direction: "back",
        nextPage: 1
      }
    });
  });
});
