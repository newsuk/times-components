import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import renderer from "react-test-renderer";
import trackingContextTypes from "../src/tracking-context-types";
import { withTrackingContext } from "../src/tracking";

module.exports = () => {
  describe("WithTrackingContext", () => {
    const TestComponent = ({ someProp }) => <Text>{someProp}</Text>;
    TestComponent.propTypes = { someProp: PropTypes.string };
    TestComponent.defaultProps = { someProp: "foo" };
    TestComponent.someStatic = { foo: "bar" };

    const withTestTracking = WrappedComponent => {
      const TestTracking = (props, context) => {
        const { tracking } = context;
        tracking.analytics({
          action: "Viewed",
          attrs: {},
          component: "TestComponent"
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
          getAttrs: props => ({ one: props.keyTwo, three: "four" }),
          trackingObjectName: "TestObject"
        }
      );
      const reporter = jest.fn();

      renderer.create(
        <WithTrackingAndContext analyticsStream={reporter} keyTwo="two" />
      );

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "Viewed",
          attrs: expect.objectContaining({ one: "two", three: "four" })
        })
      );
    });

    it("allows tracking attrs to be overriden by descendant tracking context", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTrackingContext(withTestTracking(TestComponent), {
          getAttrs: () => ({ one: "three" })
        }),
        {
          getAttrs: () => ({
            one: "two"
          }),
          trackingObjectName: "TestObject"
        }
      );
      const reporter = jest.fn();

      renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "Viewed",
          attrs: expect.objectContaining({ one: "three" })
        })
      );
    });

    it("applies object to descendant events", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTestTracking(TestComponent),
        {
          trackingObjectName: "TestObject"
        }
      );
      const reporter = jest.fn();

      renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "Viewed",
          object: "TestObject"
        })
      );
    });

    it("allows object to be overriden by descendant tracking context", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTrackingContext(withTestTracking(TestComponent), {
          trackingObjectName: "TestObject2"
        }),
        { trackingObjectName: "TestObject" }
      );
      const reporter = jest.fn();

      renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "Viewed",
          object: "TestObject2"
        })
      );
    });

    it("raises error when tracking object not supplied to top-level context", () => {
      const WithTrackingAndContext = withTrackingContext(
        withTrackingContext(withTestTracking(TestComponent), {
          trackingObjectName: "TestObject2"
        })
      );

      const render = () =>
        renderer.create(<WithTrackingAndContext analyticsStream={() => {}} />);

      expect(render).toThrowErrorMatchingSnapshot();
    });

    it("root context tracks page views", () => {
      const WithTrackingAndContext = withTrackingContext(TestComponent, {
        trackingObjectName: "AuthorProfile"
      });
      const reporter = jest.fn();

      renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "Viewed",
          component: "Page",
          object: "AuthorProfile"
        })
      );
    });

    it("tracks page views when data is ready", () => {
      const WithTrackingAndContext = withTrackingContext(TestComponent, {
        isDataReady: () => true,
        trackingObjectName: "AuthorProfile"
      });
      const reporter = jest.fn();

      renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

      expect(reporter).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "Viewed",
          component: "Page",
          object: "AuthorProfile"
        })
      );
    });

    it("doesnt track page views when data is not ready", () => {
      const WithTrackingAndContext = withTrackingContext(TestComponent, {
        isDataReady: () => false,
        trackingObjectName: "AuthorProfile"
      });
      const reporter = jest.fn();

      renderer.create(<WithTrackingAndContext analyticsStream={reporter} />);

      expect(reporter).not.toHaveBeenCalled();
    });

    it("only tracks page views when data is ready, with multiple updates", () => {
      let isReady = false;
      const WithTrackingAndContext = withTrackingContext(TestComponent, {
        isDataReady: () => isReady,
        trackingObjectName: "AuthorProfile"
      });
      const reporter = jest.fn();
      const testRenderer = renderer.create(
        <WithTrackingAndContext analyticsStream={reporter} />
      );
      expect(reporter).not.toHaveBeenCalled();

      isReady = true;
      testRenderer.update(
        <WithTrackingAndContext analyticsStream={reporter} />
      );
      testRenderer.update(
        <WithTrackingAndContext analyticsStream={reporter} />
      );

      expect(reporter).toHaveBeenCalledTimes(1);
    });

    /* This can occur if the child accidentally unmounts and is remounted */
    it("doesn't fire a second page view event if root element is re-rendered", () => {
      const WithTrackingAndContext = withTrackingContext(TestComponent, {
        trackingObjectName: "AuthorProfile"
      });
      const reporter = jest.fn();
      const testRenderer = renderer.create(
        <WithTrackingAndContext analyticsStream={reporter} />
      );
      testRenderer.update(
        <WithTrackingAndContext analyticsStream={reporter} />
      );
      expect(reporter).toHaveBeenCalledTimes(1);
    });

    it("applies timestamp to descendant events", () => {
      const WithTrackingAndContext = withTrackingContext(TestComponent, {
        trackingObjectName: "TestObject"
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
        { trackingObjectName: "TestObject2" }
      );

      const render = () => renderer.create(<WithTrackingAndContext />);

      expect(render).toThrowErrorMatchingSnapshot();
    });

    it("forwards props to wrapped component", () => {
      const WithTrackingContext = withTrackingContext(TestComponent, {
        trackingObjectName: "AuthorProfile"
      });

      const tree = renderer.create(
        <WithTrackingContext analyticsStream={() => {}} someProp="bar" />
      );

      expect(tree).toMatchSnapshot();
    });

    it("hoists wrapped propTypes", () => {
      const WithTrackingContext = withTrackingContext(TestComponent, {
        trackingObjectName: "AuthorProfile"
      });

      expect(WithTrackingContext.propTypes).toMatchObject(
        TestComponent.propTypes
      );
    });

    it("hoists wrapped defaultProps", () => {
      const WithTrackingContext = withTrackingContext(TestComponent, {
        trackingObjectName: "AuthorProfile"
      });

      expect(WithTrackingContext.defaultProps).toMatchObject(
        TestComponent.defaultProps
      );
    });

    it("hoists wrapped statics", () => {
      const WithTrackingContext = withTrackingContext(TestComponent, {
        trackingObjectName: "AuthorProfile"
      });

      expect(WithTrackingContext.someStatic).toEqual(TestComponent.someStatic);
    });
  });
};
