// @flow

import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import get from "lodash.get";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import type {
  AnalyticsEventObjectType,
  TrackingContextObjectType,
  TrackingContextPropsType
} from "./tracking.flow";
import resolveAttrs from "./resolve-attrs";

const withTrackingContext = (
  WrappedComponent: any,
  {
    getAttrs = () => ({}),
    trackingObjectName = "",
    isDataReady = ({ isLoading }) => !isLoading
  }: TrackingContextObjectType = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackingContext extends Component<TrackingContextPropsType> {
    static defaultProps = {
      ...WrappedComponent.defaultProps
    };

    constructor(props: TrackingContextPropsType, context: {}) {
      super(props, context);

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

    componentDidUpdate() {
      this.attemptTrackPageEvent(this.props);
    }

    pageEventTriggered: boolean;

    attemptTrackPageEvent(props: TrackingContextPropsType) {
      if (
        isDataReady(props) &&
        this.isRootTrackingContext() &&
        this.pageEventTriggered === false
      ) {
        this.pageEventTriggered = true;

        this.fireAnalyticsEvent({
          action: "Viewed",
          attrs: resolveAttrs(getAttrs, props),
          component: "Page"
        });
      }
    }

    fireAnalyticsEvent = ({
      object,
      component,
      action,
      attrs
    }: AnalyticsEventObjectType) => {
      const decoratedEvent = {
        action,
        attrs: {
          ...resolveAttrs(getAttrs, this.props),
          ...attrs
        },
        component,
        object: trackingObjectName
      };

      if (object || trackingObjectName) {
        decoratedEvent.object = object || trackingObjectName;
      }

      if (this.isRootTrackingContext()) {
        decoratedEvent.attrs.eventTime = new Date().toISOString();
      }

      this.analyticsStream(decoratedEvent);
    };

    isRootTrackingContext() {
      return !this.context || !this.context.tracking;
    }

    analyticsStream(analyticsEvent: AnalyticsEventObjectType) {
      const stream =
        get(this.context, "tracking.analytics") || this.props.analyticsStream;
      return stream && stream(analyticsEvent);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithTrackingContext.displayName = `WithTrackingContext(${componentName})`;
  WithTrackingContext.contextTypes = trackingContextTypes;
  WithTrackingContext.childContextTypes = trackingContextTypes;
  WithTrackingContext.propTypes = {
    analyticsStream: PropTypes.func,
    ...WrappedComponent.propTypes
  };
  hoistNonReactStatic(WithTrackingContext, WrappedComponent);

  return WithTrackingContext;
};

export default withTrackingContext;
