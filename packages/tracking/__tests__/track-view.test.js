import { Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import TrackView, { withTrackView } from "../track-view";
import trackingContextTypes from "../tracking-context-types";

describe("TrackView", () => {
  const TestComponent = () => <Text>foo</Text>;

  class TestContext extends React.Component {
    static get childContextTypes() {
      return trackingContextTypes;
    }
    static get propTypes() {
      return { children: PropTypes.element.isRequired };
    }
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
      return this.props.children;
    }
  }

  it("renders when tracking context is missing", () => {
    const tree = renderer
      .create(
        <TrackView>
          <TestComponent />
        </TrackView>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("raises component viewed event", () => {
    const reporter = jest.fn();

    renderer.create(
      <TestContext analyticsStream={reporter}>
        <TrackView>
          <TestComponent />
        </TrackView>
      </TestContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({ action: "Viewed" })
    );
  });

  it("infers name of functional component", () => {
    const reporter = jest.fn();

    renderer.create(
      <TestContext analyticsStream={reporter}>
        <TrackView>
          <TestComponent />
        </TrackView>
      </TestContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({ component: "TestComponent" })
    );
  });

  it("infers name of class component", () => {
    // eslint-disable-next-line react/no-multi-comp, react/prefer-stateless-function
    class TestClassComponent extends React.Component {
      render() {
        return <Text>foo</Text>;
      }
    }
    const reporter = jest.fn();

    renderer.create(
      <TestContext analyticsStream={reporter}>
        <TrackView>
          <TestClassComponent />
        </TrackView>
      </TestContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        component: "TestClassComponent"
      })
    );
  });

  it("accepts component name override", () => {
    const reporter = jest.fn();

    renderer.create(
      <TestContext analyticsStream={reporter}>
        <TrackView trackingName="TrackedThing">
          <TestComponent />
        </TrackView>
      </TestContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        component: "TrackedThing"
      })
    );
  });

  it("applies tracking attrs", () => {
    const reporter = jest.fn();

    renderer.create(
      <TestContext analyticsStream={reporter}>
        <TrackView getAttrs={props => ({ one: props.keyTwo, three: "four" })}>
          <TestComponent keyTwo="two" />
        </TrackView>
      </TestContext>
    );

    expect(reporter).toHaveBeenCalledWith(
      expect.objectContaining({
        attrs: expect.objectContaining({ one: "two", three: "four" })
      })
    );
  });

  describe("withTrackView", () => {
    it("wraps component with view tracking", () => {
      const reporter = jest.fn();
      const ComponentWithTrackView = withTrackView(TestComponent);
      renderer.create(
        <TestContext analyticsStream={reporter}>
          <ComponentWithTrackView />
        </TestContext>
      );

      expect(reporter.mock.calls).toMatchSnapshot();
    });
  });
});
