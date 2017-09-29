import React from "react";
import { Text } from "react-native";
import renderer from "react-test-renderer";
import trackingContextTypes from "../tracking-context-types";
import TrackingContext, { withTrackingContext } from "../tracking-context";

describe("TrackingContext", () => {
  const TestComponent = () => <Text>foo</Text>;

  const TestTracking = (props, context) => {
    context.tracking.analytics({
      component: "TestComponent",
      action: "TestAction",
      attrs: {}
    });
    return props.children;
  };
  TestTracking.contextTypes = trackingContextTypes;

  const RealDate = global.Date;

  beforeEach(() => {
    global.Date = jest.fn(() => new RealDate("2017-09-26T15:25:56.206Z"));
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it("applies tracking attrs to descendant events", () => {
    const reporter = jest.fn();

    renderer.create(
      <TrackingContext
        analyticsStream={reporter}
        trackingObject="TestObject"
        getAttrs={props => ({ one: props.keyTwo, three: "four" })}
      >
        <TestTracking keyTwo="two">
          <TestComponent />
        </TestTracking>
      </TrackingContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "TestAction",
        attrs: expect.objectContaining({ one: "two", three: "four" })
      })
    );
  });

  it("allows tracking attrs to be overriden by descendant tracking context", () => {
    const reporter = jest.fn();

    renderer.create(
      <TrackingContext
        analyticsStream={reporter}
        trackingObject="TestObject"
        getAttrs={() => ({ one: "two" })}
      >
        <TrackingContext getAttrs={() => ({ one: "three" })}>
          <TestTracking>
            <TestComponent />
          </TestTracking>
        </TrackingContext>
      </TrackingContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "TestAction",
        attrs: expect.objectContaining({ one: "three" })
      })
    );
  });

  it("applies object to descendant events", () => {
    const reporter = jest.fn();

    renderer.create(
      <TrackingContext analyticsStream={reporter} trackingObject="TestObject">
        <TestTracking>
          <TestComponent />
        </TestTracking>
      </TrackingContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "TestObject",
        action: "TestAction"
      })
    );
  });

  it("allows object to be overriden by descendant tracking context", () => {
    const reporter = jest.fn();

    renderer.create(
      <TrackingContext analyticsStream={reporter} trackingObject="TestObject">
        <TrackingContext trackingObject="TestObject2">
          <TestTracking>
            <TestComponent />
          </TestTracking>
        </TrackingContext>
      </TrackingContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "TestObject2",
        action: "TestAction"
      })
    );
  });

  it("raises error when tracking object not supplied to top-level context", () => {
    const render = () =>
      renderer.create(
        <TrackingContext analyticsStream={() => {}}>
          <TrackingContext trackingObject="TestObject2">
            <TestTracking>
              <TestComponent />
            </TestTracking>
          </TrackingContext>
        </TrackingContext>
      );

    expect(render).toThrowErrorMatchingSnapshot();
  });

  it("top-level context tracks page views", () => {
    const reporter = jest.fn();
    renderer.create(
      <TrackingContext
        analyticsStream={reporter}
        trackingObject="AuthorProfile"
      >
        <TestComponent />
      </TrackingContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "AuthorProfile",
        action: "Viewed",
        component: "Page",
        attrs: expect.objectContaining({})
      })
    );
  });

  it("applies timestamp to descendant events", () => {
    const reporter = jest.fn();
    renderer.create(
      <TrackingContext analyticsStream={reporter} trackingObject="TestObject">
        <TestComponent />
      </TrackingContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: { eventTime: "2017-09-26T15:25:56.206Z" }
      })
    );
  });

  it("raises error when analyticsStream not supplied to top-level context", () => {
    const render = () =>
      renderer.create(
        <TrackingContext trackingObject="TestObject">
          <TestComponent />
        </TrackingContext>
      );

    expect(render).toThrowErrorMatchingSnapshot();
  });

  describe("withTrackingContext", () => {
    it("wraps component in tracking context", () => {
      const reporter = jest.fn();
      const ComponentWithContext = withTrackingContext(TestComponent, {
        trackingObject: "TestObject",
        analyticsStream: reporter
      });
      renderer.create(<ComponentWithContext />);

      expect(reporter.mock.calls).toMatchSnapshot();
    });
  });
});
