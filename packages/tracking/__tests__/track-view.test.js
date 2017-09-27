import { Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import { withTrackView } from "../tracking";
import trackingContextTypes from "../tracking-context-types";

describe("WithTrackView", () => {
  const TestComponent = props => <Text>{props.someProp}</Text>;
  TestComponent.propTypes = { someProp: PropTypes.string };
  TestComponent.defaultProps = { someProp: "foo" };
  TestComponent.someStatic = { foo: "bar" };

  const withTestContext = WrappedComponent => {
    class TestContext extends React.Component {
      getChildContext() {
        const self = this;
        return {
          tracking: {
            analytics(...args) {
              self.props.analyticsStream(...args);
            }
          }
        };
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    TestContext.childContextTypes = trackingContextTypes;
    return TestContext;
  };

  it("renders when tracking context is missing", () => {
    const WithTracking = withTrackView(TestComponent);

    const tree = renderer.create(<WithTracking />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("raises event on wrapped component render", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackView(TestComponent)
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith({
      action: "Viewed",
      attrs: {},
      component: "TestComponent"
    });
  });

  it("accepts component name override", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackView(TestComponent, { trackingName: "TrackedThing" })
    );
    const reporter = jest.fn();

    renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

    expect(reporter).toHaveBeenCalledWith({
      action: "Viewed",
      attrs: {},
      component: "TrackedThing"
    });
  });

  it("applies tracking attrs", () => {
    const WithTrackingAndContext = withTestContext(
      withTrackView(TestComponent, {
        getAttrs: props => ({ one: props.keyTwo, three: "four" })
      })
    );
    const reporter = jest.fn();

    renderer.create(
      <WithTrackingAndContext keyTwo="two" analyticsStream={reporter} />
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: expect.objectContaining({ one: "two", three: "four" })
      })
    );
  });

  it("forwards props to wrapped component", () => {
    const WithTracking = withTrackView(TestComponent);
    const tree = renderer.create(<WithTracking someProp="bar" />);

    expect(tree).toMatchSnapshot();
  });

  it("hoists wrapped propTypes", () => {
    const WithTracking = withTrackView(TestComponent);

    expect(WithTracking.propTypes).toEqual(TestComponent.propTypes);
  });

  it("hoists wrapped defaultProps", () => {
    const WithTracking = withTrackView(TestComponent);

    expect(WithTracking.defaultProps).toEqual(TestComponent.defaultProps);
  });

  it("hoists wrapped statics", () => {
    const WithTracking = withTrackView(TestComponent);

    expect(WithTracking.someStatic).toEqual(TestComponent.someStatic);
  });
});
