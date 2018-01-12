import React from "react";
import PropTypes from "prop-types";
import Enzyme, { shallow, mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import withDebounce from "../debounce";

Enzyme.configure({ adapter: new React16Adapter() });

jest.useFakeTimers();

// Alias the confusingly misnamed runTimersToTime to advanceTimersByTime
// Jest has done this in v22, so this can be removed if we upgrade
jest.advanceTimersByTime = jest.runTimersToTime;

/* eslint react/prop-types: 0 */
class Inner extends React.Component {
  constructor(props) {
    super(props);
    this.numberOfDebouncedPropsUpdates = 0;
  }

  componentWillReceiveProps(props) {
    if (this.props.debouncedProps !== props.debouncedProps) {
      this.numberOfDebouncedPropsUpdates += 1;
    }
  }

  render() {
    return "hello";
  }
}

describe("Debounce Tests", () => {
  it("adds debounceProps to the props passed to the inner component", () => {
    const Outer = withDebounce(Inner, 1000);
    const component = shallow(<Outer foo="initialFoo" />);
    expect(component.find("Inner").props()).toEqual({
      foo: "initialFoo",
      debouncedProps: { foo: "initialFoo" },
      isDebouncing: false
    });
  });

  const testUpdateInnerPropsAfterDelay = delay => {
    const Outer = withDebounce(Inner, delay);
    const component = shallow(<Outer foo="initialFoo" />);

    component.setProps({ foo: "updatedFoo" });
    expect(component.find("Inner").props()).toEqual({
      foo: "updatedFoo",
      debouncedProps: { foo: "initialFoo" },
      isDebouncing: true
    });

    jest.advanceTimersByTime(0.99 * delay);
    expect(
      component
        .update()
        .find("Inner")
        .props().debouncedProps
    ).toEqual({ foo: "initialFoo" });

    jest.advanceTimersByTime(0.02 * delay);
    expect(
      component
        .update()
        .find("Inner")
        .props().debouncedProps
    ).toEqual({ foo: "updatedFoo" });
  };

  it("immediately updates props, but delays update of debouncedProps", () => {
    testUpdateInnerPropsAfterDelay(1000);
  });

  it("handles different debounce delays", () => {
    testUpdateInnerPropsAfterDelay(2500);
  });

  it("updates debounceProps once for many closely spaced props updates", () => {
    const Outer = withDebounce(Inner, 1000);
    const component = mount(<Outer foo="initialFoo" />);

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

  it("does not atttempt to update props after unmount", () => {
    const Outer = withDebounce(Inner, 1000);
    const component = shallow(<Outer foo="initialFoo" />);
    const setState = jest.spyOn(component.instance(), "handleDebounceTimer");

    expect(setState.mock.calls.length).toEqual(0);

    component.setProps({ foo: "updatedFoo1" });
    jest.advanceTimersByTime(1200);
    expect(setState.mock.calls.length).toEqual(1);

    component.unmount();
    component.setProps({ foo: "updatedFoo2" });
    jest.advanceTimersByTime(1200);
    expect(setState.mock.calls.length).toEqual(1);
  });

  it("has appropriate static members on the outer component", () => {
    /* eslint react/no-multi-comp: 0 */
    class InnerWithStatics extends React.Component {
      static staticMember = "staticMemberValue";
      render() {
        return this.props.foo;
      }
    }
    InnerWithStatics.propTypes = {
      foo: PropTypes.string
    };
    InnerWithStatics.defaultProps = {
      foo: ""
    };
    InnerWithStatics.displayName = "InnerWithStatics";

    const Outer = withDebounce(InnerWithStatics, 1000);
    expect(Outer.displayName).toEqual("WithDebounce(InnerWithStatics)");
    expect(Outer.staticMember).toEqual("staticMemberValue");
    expect(Outer.propTypes).toEqual({ foo: PropTypes.string });
    expect(Outer.defaultProps).toEqual(InnerWithStatics.defaultProps);
  });
});
