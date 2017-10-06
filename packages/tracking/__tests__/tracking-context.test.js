import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import trackingContextTypes from "../tracking-context-types";
import { withTrackingContext } from "../tracking";

describe("WithTrackingContext", () => {
  const TestComponent = props => <Text>{props.someProp}</Text>;
  TestComponent.propTypes = { someProp: PropTypes.string };
  TestComponent.defaultProps = { someProp: "foo" };
  TestComponent.someStatic = { foo: "bar" };

  const withTestTracking = WrappedComponent => {
    const TestTracking = (props, context) => {
      context.tracking.analytics({
        component: "TestComponent",
        action: "TestAction",
        attrs: {}
      });
      return <WrappedComponent {...props} />;
    };
    TestTracking.contextTypes = trackingContextTypes;
    return TestTracking;
  };

  const RealDate = global.Date;

  afterEach(() => {
    global.Date = RealDate;
  });

  it("applies tracking attrs to descendant events", () => {
    const WithTrackingAndContext = withTrackingContext(
      withTestTracking(TestComponent),
      {
        trackingObject: "TestObject",
        getAttrs: props => ({ one: props.keyTwo, three: "four" })
      }
    );
    const reporter = jest.fn();

    renderer.create(
      <WithTrackingAndContext keyTwo="two" analyticsStream={reporter} />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "TestAction",
        attrs: expect.objectContaining({ one: "two", three: "four" })
      })
    );
  });

  it("allows tracking attrs to be overriden by descendant tracking context", () => {
    const WithTrackingAndContext = withTrackingContext(
      withTrackingContext(withTestTracking(TestComponent), {
        getAttrs: () => ({ one: "three" })
      }),
      { trackingObject: "TestObject", getAttrs: () => ({ one: "two" }) }
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "TestAction",
        attrs: expect.objectContaining({ one: "three" })
      })
    );
  });

  it("applies object to descendant events", () => {
    const WithTrackingAndContext = withTrackingContext(
      withTestTracking(TestComponent),
      {
        trackingObject: "TestObject"
      }
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "TestObject",
        action: "TestAction"
      })
    );
  });

  it("allows object to be overriden by descendant tracking context", () => {
    const WithTrackingAndContext = withTrackingContext(
      withTrackingContext(withTestTracking(TestComponent), {
        trackingObject: "TestObject2"
      }),
      { trackingObject: "TestObject" }
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "TestObject2",
        action: "TestAction"
      })
    );
  });

  it("raises error when tracking object not supplied to top-level context", () => {
    const WithTrackingAndContext = withTrackingContext(
      withTrackingContext(withTestTracking(TestComponent), {
        trackingObject: "TestObject2"
      })
    );

    const render = () =>
      renderer.create(<WithTrackingAndContext analyticsStream={() => {}} />);

    expect(render).toThrow(TypeError);
  });

  it("root context tracks page views", () => {
    const WithTrackingAndContext = withTrackingContext(TestComponent, {
      trackingObject: "AuthorProfile"
    });
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        object: "AuthorProfile",
        action: "Viewed",
        component: "Page"
      })
    );
  });

  it("applies timestamp to descendant events", () => {
    const WithTrackingAndContext = withTrackingContext(TestComponent, {
      trackingObject: "TestObject"
    });
    const reporter = jest.fn();
    global.Date = jest.fn(() => new RealDate("2017-09-26T15:25:56.206Z"));

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: { eventTime: "2017-09-26T15:25:56.206Z" }
      })
    );
  });

  it("raises error when analyticsStream not supplied to top-level context", () => {
    const WithTrackingAndContext = withTrackingContext(
      withTestTracking(TestComponent),
      { trackingObject: "TestObject2" }
    );

    const render = () => renderer.create(<WithTrackingAndContext />);

    expect(render).toThrow(TypeError);
  });

  it("forwards props to wrapped component", () => {
    const WithTrackingContext = withTrackingContext(TestComponent, {
      trackingObject: "AuthorProfile"
    });

    const tree = renderer.create(
      <WithTrackingContext someProp="bar" analyticsStream={() => {}} />
    );

    expect(tree).toMatchSnapshot();
  });

  it("hoists wrapped propTypes", () => {
    const WithTrackingContext = withTrackingContext(TestComponent, {
      trackingObject: "AuthorProfile"
    });

    expect(WithTrackingContext.propTypes).toMatchObject(
      TestComponent.propTypes
    );
  });

  it("hoists wrapped defaultProps", () => {
    const WithTrackingContext = withTrackingContext(TestComponent, {
      trackingObject: "AuthorProfile"
    });

    expect(WithTrackingContext.defaultProps).toMatchObject(
      TestComponent.defaultProps
    );
  });

  it("hoists wrapped statics", () => {
    const WithTrackingContext = withTrackingContext(TestComponent, {
      trackingObject: "AuthorProfile"
    });

    expect(WithTrackingContext.someStatic).toEqual(TestComponent.someStatic);
  });
});
