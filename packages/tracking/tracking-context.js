// @flow

import React from "react";
import type { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import _get from "lodash.get";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

type TrackingProps = {
  analyticsStream: () => mixed
};

type TrackingObject = {
  getAttrs: () => mixed,
  trackingObject: any,
  isDataReady: (props: TrackingProps) => boolean   
};

const withTrackingContext = (
  WrappedComponent: Component<any>,
  { getAttrs = () => ({}), trackingObject, isDataReady = () => true }: TrackingObject = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackingContext extends React.Component<TrackingProps> {
    constructor(props: TrackingProps, context) {
      super(props, context);
      this.fireAnalyticsEvent = this.fireAnalyticsEvent.bind(this);
      this.pageEventTriggered = false;
      if (this.isRootTrackingContext()) {
        if (!trackingObject) {
          throw new TypeError(
            "Missing argument trackingObject of withTrackingContext()"
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

    componentWillReceiveProps(nextProps: TrackingProps) {
      this.attemptTrackPageEvent(nextProps);
    }

    attemptTrackPageEvent(props: TrackingProps) {
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

    fireAnalyticsEvent({ object, component, action, attrs }) {
      const decoratedEvent = {
        component,
        action,
        attrs: {
          ...resolveAttrs(getAttrs, this.props),
          ...attrs
        }
      };

      if (object || trackingObject) {
        decoratedEvent.object = object || trackingObject;
      }

      if (this.isRootTrackingContext()) {
        decoratedEvent.attrs.eventTime = new Date().toISOString();
      }

      this.analyticsStream(decoratedEvent);
    }

    isRootTrackingContext() {
      return !this.context || !this.context.tracking;
    }

    analyticsStream(...args) {
      const stream =
        _get(this.context, "tracking.analytics") || this.props.analyticsStream;
      return stream && stream(...args);
    }

    render() {
      return <WithTrackingContext {...this.props} />;
    }
  }

  WithTrackingContext.displayName = `WithTrackingContext(${componentName})`;
  WithTrackingContext.contextTypes = trackingContextTypes;
  WithTrackingContext.childContextTypes = trackingContextTypes;
  WithTrackingContext.propTypes = {
    analyticsStream: PropTypes.func,
    ...WrappedComponent.propTypes
  };
  WithTrackingContext.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackingContext, WrappedComponent);

  return WithTrackingContext;
};

export default withTrackingContext;
