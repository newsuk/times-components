import React, { Component } from "react";
import PropTypes from "prop-types";
import Enzyme, { shallow, mount } from "enzyme";
import React16Adapter from "enzyme-adapter-react-16";

import withDebounce from "../debounce";

Enzyme.configure({ adapter: new React16Adapter() });

jest.useFakeTimers();

// Alias the confusingly misnamed runTimersToTime to advanceTimersByTime
// Jest has done this in v22, so this can be removed if we upgrade
jest.advanceTimersByTime = jest.runTimersToTime;

class Inner extends Component {
  constructor(props) {
    super(props);
    this.numberOfDebouncedPropsUpdates = 0;
  }

  componentWillReceiveProps({ debouncedProps }) {
    if (debouncedProps !== this.props.debouncedProps) {
      this.numberOfDebouncedPropsUpdates += 1;
    }
  }

  render() {
    return "hello";
  }
}
Inner.propTypes = {
  debouncedProps: PropTypes.shape({}).isRequired
};

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

  it("updates debounceProps once for many closely spaced props updates", () => {
    const Outer = withDebounce(Inner);
    const component = mount(<Outer foo="initialFoo" debounceTimeMs={1000} />);

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
