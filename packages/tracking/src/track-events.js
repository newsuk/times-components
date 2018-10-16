import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

const validateEvents = (events, componentName) => {
  const nameMap = new Set();
  events.forEach((e, i) => {
    if (e.eventName === undefined) {
      throw new Error(
        `WithTrackEvents(${componentName}): Missing eventName at position ${
          i
        }, actionName ${e.actionName}`
      );
    }
    if (e.actionName === undefined) {
      throw new Error(
        `WithTrackEvents(${componentName}): Missing actionName at position ${
          i
        }, eventName ${e.eventName}`
      );
    }
    if (nameMap.has(e.eventName)) {
      throw new Error(
        `WithTrackEvents(${componentName}): Event ${
          e.eventName
        } was tracked multiple times`
      );
    }
    nameMap.add(e.eventName);
  });
};

export default (WrappedComponent, { analyticsEvents = [] } = {}) => {
  const componentName = getDisplayName(WrappedComponent);
  validateEvents(analyticsEvents, componentName);

  class WithTrackEvents extends Component {
    get wrappedAnalyticsEvents() {
      return this.wrapWithTracking(
        analyticsEvents,
        (attrs, actionName, trackingName) =>
          this.context.tracking &&
          this.context.tracking.analytics({
            action: actionName,
            attrs,
            component: trackingName || componentName
          })
      );
    }

    wrapWithTracking(eventNames, tracking) {
      return eventNames.reduce(
        (
          wrappedFuncProps,
          { eventName, actionName, getAttrs, trackingName }
        ) => {
          const funcWrapped = (...args) => {
            const attrs = resolveAttrs(getAttrs, this.props, args);
            tracking(attrs, actionName, trackingName);
            return this.props[eventName] && this.props[eventName](...args);
          };

          return {
            ...wrappedFuncProps,
            [eventName]: funcWrapped
          };
        },
        {}
      );
    }

    render() {
      const wrappedProps = {
        ...this.props,
        ...this.wrappedAnalyticsEvents
      };

      return <WrappedComponent {...wrappedProps} />;
    }
  }

  WithTrackEvents.contextTypes = trackingContextTypes;
  WithTrackEvents.displayName = `WithTrackEvents(${componentName})`;
  WithTrackEvents.propTypes = WrappedComponent.propTypes;
  WithTrackEvents.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackEvents, WrappedComponent);

  return WithTrackEvents;
};
