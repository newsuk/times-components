import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import { withTrackEvents } from "../src/tracking";
import withTrackingContext from "./test-tracking-context";
import sharedTrackingTests from "./shared-tracking-tests";

module.exports = () => {
  describe("TrackEvents", () => {
    const TestComponent = ({ event1, event2, ...props }) => {
      event1("event1 arg");
      event2("event2 arg");
      return <Text>{props.someProp}</Text>;
    };
    TestComponent.propTypes = {
      event1: PropTypes.func,
      event2: PropTypes.func,
      someProp: PropTypes.string
    };
    TestComponent.defaultProps = {
      event1: () => {},
      event2: () => {},
      someProp: "foo"
    };
    TestComponent.someStatic = { foo: "bar" };

    const props = {
      event1: () => {},
      event2: () => {}
    };

    it("ignores events not exposed by tracked component", () => {
      const reporter = jest.fn();

      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "happened",
              eventName: "unknownEvent"
            }
          ]
        })
      );

      renderer.create(
        <WithTrackingAndContext analyticsStream={reporter} {...props} />
      );

      expect(reporter).not.toHaveBeenCalled();
    });

    it("tracks specified child events", () => {
      const reporter = jest.fn();
      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "event1ed",
              eventName: "event1"
            }
          ]
        })
      );

      renderer.create(
        <WithTrackingAndContext analyticsStream={reporter} {...props} />
      );

      expect(reporter).toHaveBeenCalledWith({
        action: "event1ed",
        attrs: {},
        component: "TestComponent"
      });
    });

    it("raises error when trying to track the same event more than once", () => {
      const addTracking = () =>
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "event1ed",
              eventName: "event1"
            },
            {
              actionName: "event1ed",
              eventName: "event1"
            }
          ]
        });

      expect(addTracking).toThrowErrorMatchingSnapshot();
    });

    it("raises error when action name is not set", () => {
      const addTracking = () =>
        withTrackEvents(TestComponent, {
          analyticsEvents: [{ eventName: "event1" }]
        });

      expect(addTracking).toThrowErrorMatchingSnapshot();
    });

    it("raises error when event name is not set", () => {
      const addTracking = () =>
        withTrackEvents(TestComponent, {
          analyticsEvents: [{ actionName: "event1ed" }]
        });

      expect(addTracking).toThrowErrorMatchingSnapshot();
    });

    it("accepts component name override", () => {
      const reporter = jest.fn();
      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "event1ed",
              eventName: "event1",
              trackingName: "OverriddenName"
            }
          ]
        })
      );

      renderer.create(
        <WithTrackingAndContext analyticsStream={reporter} {...props} />
      );

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({ component: "OverriddenName" })
      );
    });

    it("applies tracking attrs", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "event1ed",
              eventName: "event1",
              getAttrs: ({ aProp }, eventArgs) => ({
                args: eventArgs,
                fromProps: aProp,
                static: "value"
              })
            }
          ]
        })
      );
      const reporter = jest.fn();

      renderer.create(
        <WithTrackingAndContext
          analyticsStream={reporter}
          aProp="propValue"
          {...props}
        />
      );

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          attrs: expect.objectContaining({
            args: ["event1 arg"],
            fromProps: "propValue",
            static: "value"
          })
        })
      );
    });

    it("tracks multiple events", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "event1ed",
              eventName: "event1",
              getAttrs: ({ aProp }, eventArgs) => ({
                args: eventArgs,
                fromProps: aProp,
                static: "value"
              })
            },
            {
              actionName: "event2ed",
              eventName: "event2",
              getAttrs: ({ aProp }, eventArgs) => ({
                args: eventArgs,
                fromProps: aProp,
                static: "otherValue"
              })
            }
          ]
        })
      );
      const reporter = jest.fn();

      renderer.create(
        <WithTrackingAndContext
          analyticsStream={reporter}
          aProp="propValue"
          {...props}
        />
      );

      expect(reporter.mock.calls).toMatchSnapshot();
    });

    it("supports handling of tracked events", () => {
      const handler = jest.fn();
      const reporter = jest.fn();
      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              actionName: "event1ed",
              eventName: "event1"
            }
          ]
        })
      );

      renderer.create(
        <WithTrackingAndContext
          analyticsStream={reporter}
          {...props}
          event1={handler}
        />
      );

      expect(reporter).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith("event1 arg");
    });

    sharedTrackingTests(withTrackEvents);
  });
};
