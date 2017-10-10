import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

const validateEvents = events => {
  const nameMap = new Set();
  events.forEach(e => {
    if (nameMap.has(e.eventName)) {
      throw new Error(
        `Event ${e.eventName} was tracked multiple times when calling withTrackEvents()`
      );
    }
    nameMap.add(e.eventName);
  });
};

export default (
  WrappedComponent,
  { trackingName, analyticsEvents = [] } = {}
) => {
  validateEvents(analyticsEvents);
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackEvents extends Component {
    getWrappedAnalyticsEvents() {
      return this.wrapWithTracking(
        analyticsEvents,
        (attrs, actionName) =>
          this.context.tracking &&
          this.context.tracking.analytics({
            component: trackingName || componentName,
            action: actionName,
            attrs
          })
      );
    }

    wrapWithTracking(eventNames, tracking) {
      return eventNames.reduce(
        (wrappedFuncProps, { eventName, actionName, getAttrs }) => {
          const funcWrapped = (...args) => {
            const attrs = resolveAttrs(getAttrs, this.props, args);
            tracking(attrs, actionName);
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
        ...this.getWrappedAnalyticsEvents()
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
