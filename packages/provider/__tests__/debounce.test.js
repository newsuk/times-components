import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";
import Inner from "./inner";
import withDebounce from "../src/debounce";

jest.useFakeTimers();

// Alias the confusingly misnamed runTimersToTime to advanceTimersByTime
// Jest has done this in v22, so this can be removed if we upgrade
jest.advanceTimersByTime = jest.runTimersToTime;

describe("Debounce", () => {
  it("adds debounceProps to the props passed to the inner component", () => {
    const Outer = withDebounce(Inner);
    const component = shallow(<Outer foo="initialFoo" debounceTimeMs={1000} />);
    expect(component.find("Inner").props()).toEqual({
      foo: "initialFoo",
      debounceTimeMs: 1000,
      debouncedProps: {
        foo: "initialFoo",
        debounceTimeMs: 1000
      },
      isDebouncing: false
    });
  });

  it("does not change debouncing status if component recieves same props", () => {
    const Outer = withDebounce(Inner);
    const component = shallow(<Outer foo="initialFoo" debounceTimeMs={1000} />);
    component.setProps({ foo: "initialFoo" });
    expect(component.find("Inner").props()).toEqual({
      foo: "initialFoo",
      debounceTimeMs: 1000,
      debouncedProps: {
        foo: "initialFoo",
        debounceTimeMs: 1000
      },
      isDebouncing: false
    });
  });

  const testUpdateInnerPropsAfterDelay = delay => {
    const Outer = withDebounce(Inner);
    const component = shallow(
      <Outer foo="initialFoo" debounceTimeMs={delay} />
    );
    const innerProps = () =>
      component
        .update()
        .find("Inner")
        .props();

    component.setProps({ foo: "updatedFoo" });

    if (delay > 0) {
      expect(innerProps()).toMatchSnapshot();

      jest.advanceTimersByTime(0.99 * delay);

      expect(innerProps()).toMatchSnapshot();

      jest.advanceTimersByTime(0.02 * delay);
    } else {
      jest.runAllTimers();
    }

    expect(innerProps()).toMatchSnapshot();
  };

  it("immediately updates props, but delays update of debouncedProps", () => {
    testUpdateInnerPropsAfterDelay(1000);
  });

  it("handles different debounce delays", () => {
    testUpdateInnerPropsAfterDelay(2500);
  });

  it("handles zero debounce delay", () => {
    testUpdateInnerPropsAfterDelay(0);
  });

  it("does not atttempt to update props after unmount", () => {
    const Outer = withDebounce(Inner);
    const component = shallow(<Outer foo="initialFoo" debounceTimeMs={1000} />);
    const setState = jest.spyOn(component.instance(), "handleDebounceTimer");

    expect(setState.mock.calls.length).toEqual(0);

    component.setProps({ foo: "updatedFoo1" });
    jest.advanceTimersByTime(1200);
    expect(setState.mock.calls.length).toEqual(1);

    component.setProps({ foo: "updatedFoo2" });
    component.unmount();
    jest.advanceTimersByTime(1200);
    expect(setState.mock.calls.length).toEqual(1);
  });

  it("has appropriate static members on the outer component", () => {
    const InnerWithStatics = props => props.foo;
    InnerWithStatics.staticMember = "staticMemberValue";
    InnerWithStatics.propTypes = {
      foo: PropTypes.string,
      debouncedProps: PropTypes.shape({
        foo: PropTypes.string
      }).isRequired
    };
    InnerWithStatics.defaultProps = {
      foo: ""
    };
    InnerWithStatics.displayName = "InnerWithStatics";

    const Outer = withDebounce(InnerWithStatics);
    expect(Outer.displayName).toEqual("WithDebounce(InnerWithStatics)");
    expect(Outer.staticMember).toEqual("staticMemberValue");
    expect(Outer.propTypes).toEqual({
      foo: PropTypes.string,
      debounceTimeMs: PropTypes.number.isRequired
    }); // debounceTimeMs removed
    expect(Outer.defaultProps).toEqual(InnerWithStatics.defaultProps);
  });
});
