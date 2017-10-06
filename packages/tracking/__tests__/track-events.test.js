import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import { withTrackEvents } from "../tracking";
import withTrackingContext from "./test-tracking-context";

describe("TrackEvents", () => {
  const TestComponent = ({ onShow = () => ({}), ...props }) => {
    onShow("onShow arg");
    return <Text>{props.someProp}</Text>;
  };
  TestComponent.propTypes = { someProp: PropTypes.string };
  TestComponent.defaultProps = { someProp: "foo" };
  TestComponent.someStatic = { foo: "bar" };

  it("renders when tracking context is missing", () => {
    const WithTracking = withTrackEvents(TestComponent, {
      analyticsEvents: [{ eventName: "onShow", actionName: "Shown" }]
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
        analyticsEvents: [{ eventName: "onShow", actionName: "Shown" }]
      })
    );

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith({
      action: "Shown",
      attrs: {},
      component: "TestComponent"
    });
  });

  it("raises error when trying to track the same event more than once", () => {
    const addTracking = () =>
      withTrackEvents(TestComponent, {
        analyticsEvents: [
          { eventName: "onShow", actionName: "Shown1" },
          { eventName: "onShow", actionName: "Shown2" }
        ]
      });

    expect(addTracking).toThrowErrorMatchingSnapshot();
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();
    const WithTrackingAndContext = withTrackingContext(
      withTrackEvents(TestComponent, {
        trackingName: "OverriddenName",
        analyticsEvents: [{ eventName: "onShow", actionName: "Shown" }]
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
        analyticsEvents: [{ eventName: "onShow", actionName: "Shown" }],
        getAttrs: (props, eventArgs) => ({
          fromProps: props.aProp,
          static: "value",
          args: eventArgs
        })
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
          args: ["onShow arg"]
        })
      })
    );
  });

  it("does not overwrite existing event handlers", () => {
    const handler = jest.fn();
    const WithTrackingAndContext = withTrackingContext(
      withTrackEvents(TestComponent, {
        analyticsEvents: [{ eventName: "onShow", actionName: "Shown" }]
      })
    );

    renderer.create(
      <WithTrackingAndContext analyticsStream={() => {}} onShow={handler} />
    );

    expect(handler).toHaveBeenCalledWith("onShow arg");
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
