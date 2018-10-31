import React from "react";
import PropTypes from "prop-types";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
import Inner from "./inner";
import withDebounce, { Debounce } from "../src/debounce";

jest.useFakeTimers();

// Alias the confusingly misnamed runTimersToTime to advanceTimersByTime
// Jest has done this in v22, so this can be removed if we upgrade
jest.advanceTimersByTime = jest.runTimersToTime;

describe("Debounce", () => {
  const testUpdateInnerPropsAfterDelay = delay => {
    const component = shallow(
      <Debounce
        debounceRender={props => <Inner {...props} />}
        debounceTimeMs={delay}
        foo="initialFoo"
      />
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

  iterator([
    {
      name: "adds debounceProps to the props passed to the inner component",
      test() {
        const component = shallow(
          <Debounce
            debounceRender={props => <Inner {...props} />}
            debounceTimeMs={1000}
            foo="initialFoo"
          />
        );
        expect(component.find("Inner").props()).toEqual({
          debouncedProps: {
            debounceRender: expect.any(Function),
            debounceTimeMs: 1000,
            foo: "initialFoo"
          },
          debounceTimeMs: 1000,
          foo: "initialFoo",
          isDebouncing: false
        });
      }
    },

    {
      name:
        "does not change debouncing status if component recieves same props",
      test() {
        const component = shallow(
          <Debounce
            debounceRender={props => <Inner {...props} />}
            debounceTimeMs={1000}
            foo="initialFoo"
          />
        );
        component.setProps({ foo: "initialFoo" });
        expect(component.find("Inner").props()).toEqual({
          debouncedProps: {
            debounceRender: expect.any(Function),
            debounceTimeMs: 1000,
            foo: "initialFoo"
          },
          debounceTimeMs: 1000,
          foo: "initialFoo",
          isDebouncing: false
        });
      }
    },

    {
      name: "immediately updates props, but delays update of debouncedProps",
      test() {
        testUpdateInnerPropsAfterDelay(1000);
      }
    },

    {
      name: "handles different debounce delays",
      test() {
        testUpdateInnerPropsAfterDelay(2500);
      }
    },

    {
      name: "handles zero debounce delay",
      test() {
        testUpdateInnerPropsAfterDelay(0);
      }
    },

    {
      name: "does not attempt to update props after unmount",
      test() {
        const component = shallow(
          <Debounce
            debounceRender={props => <Inner {...props} />}
            debounceTimeMs={1000}
            foo="initialFoo"
          />
        );
        const setState = jest.spyOn(
          component.instance(),
          "handleDebounceTimer"
        );

        expect(setState.mock.calls.length).toEqual(0);

        component.setProps({ foo: "updatedFoo1" });
        jest.advanceTimersByTime(1200);
        expect(setState.mock.calls.length).toEqual(1);

        component.setProps({ foo: "updatedFoo2" });
        component.unmount();
        jest.advanceTimersByTime(1200);
        expect(setState.mock.calls.length).toEqual(1);
      }
    }
  ]);

  describe("withDebounce", () => {
    iterator([
      {
        name: "has appropriate static members on the outer component",
        test() {
          const InnerWithStatics = props => props.foo;
          InnerWithStatics.staticMember = "staticMemberValue";
          InnerWithStatics.propTypes = {
            debouncedProps: PropTypes.shape({
              foo: PropTypes.string
            }).isRequired,
            foo: PropTypes.string
          };
          InnerWithStatics.defaultProps = {
            foo: ""
          };
          InnerWithStatics.displayName = "InnerWithStatics";

          const Outer = withDebounce(InnerWithStatics);
          expect(Outer.displayName).toEqual("WithDebounce(InnerWithStatics)");
          expect(Outer.staticMember).toEqual("staticMemberValue");
          expect(Outer.propTypes).toEqual({
            debounceTimeMs: PropTypes.number.isRequired,
            foo: PropTypes.string
          }); // debounceTimeMs removed
          expect(Outer.defaultProps).toEqual(InnerWithStatics.defaultProps);
        }
      }
    ]);
  });
});
