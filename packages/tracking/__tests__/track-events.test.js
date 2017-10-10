import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import { withTrackEvents } from "../tracking";
import withTrackingContext from "./test-tracking-context";

describe("TrackEvents", () => {
  const TestComponent = ({
    event1 = () => ({}),
    event2 = () => ({}),
    ...props
  }) => {
    event1("event1 arg");
    event2("event2 arg");
    return <Text>{props.someProp}</Text>;
  };
  TestComponent.propTypes = { someProp: PropTypes.string };
  TestComponent.defaultProps = { someProp: "foo" };
  TestComponent.someStatic = { foo: "bar" };

  it("renders when tracking context is missing", () => {
    const WithTracking = withTrackEvents(TestComponent, {
      analyticsEvents: [{ eventName: "event1", actionName: "event1ed" }]
    });

    const tree = renderer.create(<WithTracking />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("ignores events not exposed by tracked component", () => {
    const reporter = jest.fn();

    const WithTrackingAndContext = withTrackingContext(
      withTrackEvents(TestComponent, {
        analyticsEvents: [{ eventName: "unknownEvent", actionName: "happened" }]
      })
    );

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).not.toHaveBeenCalled();
  });

  it("tracks specified child events", () => {
    const reporter = jest.fn();
    const WithTrackingAndContext = withTrackingContext(
      withTrackEvents(TestComponent, {
        analyticsEvents: [{ eventName: "event1", actionName: "event1ed" }]
      })
    );

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

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
          { eventName: "event1", actionName: "event1ed1" },
          { eventName: "event1", actionName: "event1ed2" }
        ]
      });

    expect(addTracking).toThrowErrorMatchingSnapshot();
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();
    const WithTrackingAndContext = withTrackingContext(
      withTrackEvents(TestComponent, {
        trackingName: "OverriddenName",
        analyticsEvents: [{ eventName: "event1", actionName: "event1ed" }]
      })
    );

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

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
            getAttrs: (props, eventArgs) => ({
              fromProps: props.aProp,
              static: "value",
              args: eventArgs
            })
          }
        ]
      })
    );
    const reporter = jest.fn();

    renderer.create(
      <WithTrackingAndContext aProp="propValue" analyticsStream={reporter} />
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
            getAttrs: (props, eventArgs) => ({
              fromProps: props.aProp,
              static: "value",
              args: eventArgs
            })
          },
          {
            eventName: "event2",
            actionName: "event2ed",
            getAttrs: (props, eventArgs) => ({
              fromProps: props.aProp,
              static: "otherValue",
              args: eventArgs
            })
          }
        ]
      })
    );
    const reporter = jest.fn();

    renderer.create(
      <WithTrackingAndContext aProp="propValue" analyticsStream={reporter} />
    );

    expect(reporter.mock.calls).toMatchSnapshot();
  });

  it("does not overwrite existing event handlers", () => {
    const handler = jest.fn();
    const WithTrackingAndContext = withTrackingContext(
      withTrackEvents(TestComponent, {
        analyticsEvents: [{ eventName: "event1", actionName: "event1ed" }]
      })
    );

    renderer.create(
      <WithTrackingAndContext analyticsStream={() => {}} event1={handler} />
    );

    expect(handler).toHaveBeenCalledWith("event1 arg");
  });

  it("forwards props to wrapped component", () => {
    const WithTracking = withTrackEvents(TestComponent);
    const tree = renderer.create(<WithTracking someProp="bar" />);

    expect(tree).toMatchSnapshot();
  });

  it("hoists wrapped propTypes", () => {
    const WithTracking = withTrackEvents(TestComponent);

    expect(WithTracking.propTypes).toEqual(TestComponent.propTypes);
  });

  it("hoists wrapped defaultProps", () => {
    const WithTracking = withTrackEvents(TestComponent);

    expect(WithTracking.defaultProps).toEqual(TestComponent.defaultProps);
  });

  it("hoists wrapped statics", () => {
    const WithTracking = withTrackEvents(TestComponent);

    expect(WithTracking.someStatic).toEqual(TestComponent.someStatic);
  });
});
