// @flow
import React, { Component } from "react";
import getDisplayName from "react-display-name";
import get from "lodash.get";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

type AnalyticsEventObjectType = {
  component: string,
  action: string,
  attrs: Function
};

type TrackingContextPropsType = {
  analyticsStream: ({
    ...AnalyticsEventObjectType,
    object: string
  }) => void
};

type TrackingContextObjectType = {
  getAttrs: any => mixed,
  trackingObjectName: string,
  isDataReady: (props: TrackingContextPropsType) => boolean
};

const withTrackingContext = (
  WrappedComponent: Component<any>,
  {
    getAttrs = () => ({}),
    trackingObjectName = "",
    isDataReady = () => true
  }: TrackingContextObjectType
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackingContext extends Component<TrackingContextPropsType> {
    constructor(props: TrackingContextPropsType, context: {}) {
      super(props, context);
      this.fireAnalyticsEvent = this.fireAnalyticsEvent.bind(this);
      this.pageEventTriggered = false;
      if (this.isRootTrackingContext()) {
        if (!trackingObjectName) {
          throw new TypeError(
            "Missing argument trackingObjectName of withTrackingContext()"
          );
        }
        if (!this.props.analyticsStream) {
          throw new TypeError(
            "Missing prop analyticsStream of WithTrackingContext"
          );
        }
      }
    }

    getChildContext() {
      return {
        tracking: {
          analytics: this.fireAnalyticsEvent
        }
      };
    }

    componentDidMount() {
      this.attemptTrackPageEvent(this.props);
    }

    componentWillReceiveProps(nextProps: TrackingContextPropsType) {
      this.attemptTrackPageEvent(nextProps);
    }

    fireAnalyticsEvent: Function;
    pageEventTriggered: boolean;

    attemptTrackPageEvent(props: TrackingContextPropsType) {
      if (
        isDataReady(props) &&
        this.isRootTrackingContext() &&
        this.pageEventTriggered === false
      ) {
        this.pageEventTriggered = true;
        this.fireAnalyticsEvent({
          component: "Page",
          action: "Viewed",
          attrs: resolveAttrs(getAttrs, props)
        });
      }
    }

    fireAnalyticsEvent({ component, action, attrs }: AnalyticsEventObjectType) {
      const decoratedEvent = {
        component,
        action,
        attrs: {
          ...resolveAttrs(getAttrs, this.props),
          ...attrs
        },
        object: trackingObjectName
      };

      if (this.isRootTrackingContext()) {
        decoratedEvent.attrs.eventTime = new Date().toISOString();
      }

      this.analyticsStream(decoratedEvent);
    }

    isRootTrackingContext() {
      return !this.context || !this.context.tracking;
    }

    analyticsStream(...args: Array<any>) {
      const stream =
        get(this.context, "tracking.analytics") || this.props.analyticsStream;
      return stream && stream(...args);
    }

    render() {
      return <WithTrackingContext {...this.props} />;
    }
  }

  WithTrackingContext.displayName = `WithTrackingContext(${componentName})`;
  WithTrackingContext.contextTypes = trackingContextTypes;
  WithTrackingContext.childContextTypes = trackingContextTypes;
  hoistNonReactStatic(WithTrackingContext, WrappedComponent);

  return WithTrackingContext;
};

export default withTrackingContext;
