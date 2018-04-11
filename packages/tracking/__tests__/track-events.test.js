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
      someProp: PropTypes.string,
      event1: PropTypes.func,
      event2: PropTypes.func
    };
    TestComponent.defaultProps = {
      someProp: "foo",
      event1: () => {},
      event2: () => {}
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
            { eventName: "unknownEvent", actionName: "happened" }
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
          analyticsEvents: [{ eventName: "event1", actionName: "event1ed" }]
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
            { eventName: "event1", actionName: "event1ed" },
            { eventName: "event1", actionName: "event1ed" }
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
              eventName: "event1",
              actionName: "event1ed",
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
              eventName: "event1",
              actionName: "event1ed",
              getAttrs: ({ aProp }, eventArgs) => ({
                fromProps: aProp,
                static: "value",
                args: eventArgs
              })
            }
          ]
        })
      );
      const reporter = jest.fn();

      renderer.create(
        <WithTrackingAndContext
          aProp="propValue"
          analyticsStream={reporter}
          {...props}
        />
      );

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          attrs: expect.objectContaining({
            fromProps: "propValue",
            static: "value",
            args: ["event1 arg"]
          })
        })
      );
    });

    it("tracks multiple events", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTrackEvents(TestComponent, {
          analyticsEvents: [
            {
              eventName: "event1",
              actionName: "event1ed",
              getAttrs: ({ aProp }, eventArgs) => ({
                fromProps: aProp,
                static: "value",
                args: eventArgs
              })
            },
            {
              eventName: "event2",
              actionName: "event2ed",
              getAttrs: ({ aProp }, eventArgs) => ({
                fromProps: aProp,
                static: "otherValue",
                args: eventArgs
              })
            }
          ]
        })
      );
      const reporter = jest.fn();

      renderer.create(
        <WithTrackingAndContext
          aProp="propValue"
          analyticsStream={reporter}
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
          analyticsEvents: [{ eventName: "event1", actionName: "event1ed" }]
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
