import React from "react";
import { mount } from "enzyme";
import Inner from "../inner";
import withDebounce from "../../src/debounce";

jest.useFakeTimers();

// Alias the confusingly misnamed runTimersToTime to advanceTimersByTime
// Jest has done this in v22, so this can be removed if we upgrade
jest.advanceTimersByTime = jest.runTimersToTime;

describe("Debounce web test", () => {
  it("updates debounceProps once for many closely spaced props updates", () => {
    const Outer = withDebounce(Inner);
    const component = mount(<Outer debounceTimeMs={1000} foo="initialFoo" />);

    const numberOfDebouncedPropsUpdates = () =>
      component
        .update()
        .find("Inner")
        .instance().numberOfDebouncedPropsUpdates;

    expect(numberOfDebouncedPropsUpdates()).toEqual(0);

    component.setProps({ foo: "updatedFoo1" });
    jest.advanceTimersByTime(600);
    component.setProps({ foo: "updatedFoo2" });
    jest.advanceTimersByTime(600);
    component.setProps({ foo: "updatedFoo3" });
    jest.advanceTimersByTime(600);
    component.setProps({ foo: "updatedFoo4" });
    jest.advanceTimersByTime(1200);

    expect(numberOfDebouncedPropsUpdates()).toEqual(1);
  });
});
