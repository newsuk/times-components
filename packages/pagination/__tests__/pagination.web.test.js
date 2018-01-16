import "jest-styled-components";
import React from "react";
import Enzyme, { mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import tests from "./test-helper";
import Pagination, { PaginationWithoutTrackEvents } from "../pagination";

Enzyme.configure({ adapter: new React16Adapter() });

jest.useFakeTimers();

describe("Pagination Web", () => {
  tests(Pagination)();

  it("debounces calls to onChangePage", () => {
    const onChangePage = jest.fn();
    const component = mount(
      <PaginationWithoutTrackEvents
        count={500}
        page={2}
        onChangePage={onChangePage}
      />
    );

    const clickNextLink = () =>
      component
        .find("Link")
        .at(1)
        .simulate("click");
    const getResultsText = () => component.find("Results").props().children;

    expect(getResultsText()).toEqual("Showing 21 - 40 of 500 results");
    clickNextLink();
    jest.runTimersToTime(50);
    expect(getResultsText()).toEqual("Showing 41 - 60 of 500 results");
    clickNextLink();
    jest.runTimersToTime(50);
    expect(getResultsText()).toEqual("Showing 61 - 80 of 500 results");
    clickNextLink();
    jest.runTimersToTime(50);
    expect(getResultsText()).toEqual("Showing 81 - 100 of 500 results");

    expect(onChangePage).toHaveBeenCalledTimes(0);
    jest.runAllTimers();
    expect(onChangePage).toHaveBeenCalledTimes(1);
    expect(getResultsText()).toEqual("Showing 81 - 100 of 500 results");
  });
});
