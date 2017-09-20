import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import PropTypes from "prop-types";
import resolveAttrs from "./resolve-attrs";
import getDisplayName from "./get-display-name";

export const trackingContextTypes = {
  tracking: PropTypes.shape({
    analytics: PropTypes.func
  })
};

export const makeTracking = (
  WrappedComponent,
  {
    analyticsEvents = [],
    trackingName,
    attrs = {},
    trackView,
    trackChildViews = {}
  } = {}
) => {
  const componentName = getDisplayName(WrappedComponent, trackingName);

  class WithTracking extends Component {
    constructor(props) {
      super(props);

      this.wrappedFuncs = new Map();
      this.childData = {};
      this.viewed = new Set();
    }

    componentDidMount() {
      if (!this.context || !this.context.tracking) {
        return;
      }

      if (trackView) {
        this.context.tracking.analytics({
          object: componentName,
          action: "Rendered",
          attrs: {
            ...resolveAttrs(attrs, this.props)
          }
        });
      }
    }

    onChildView(id, childProps) {
      this.context.tracking.analytics({
        object: `${componentName}Child`,
        action: "Viewed",
        attrs: {
          id,
          ...resolveAttrs(trackChildViews.attrs, childProps)
        }
      });
    }

    getWrappedAnalyticsEvents() {
      return this.wrapWithTracking(
        analyticsEvents,
        (resolvedAttrs, actionName) =>
          this.context.tracking &&
          this.context.tracking.analytics({
            object: componentName,
            action: "Action",
            attrs: {
              actionName,
              ...resolvedAttrs
            }
          })
      );
    }

    wrapWithTracking(eventNames, tracking) {
      return eventNames.reduce((wrappedFuncProps, funcName) => {
        const [origFunc, wrappedFunc] = this.wrappedFuncs.get(funcName) || [];

        if (wrappedFunc && this.props[funcName] === origFunc) {
          return {
            ...wrappedFuncProps,
            [funcName]: wrappedFunc
          };
        }

        const funcWrapped = (...args) => {
          tracking(resolveAttrs(attrs, this.props), funcName);
          return this.props[funcName] && this.props[funcName](...args);
        };

        this.wrappedFuncs.set(funcName, [this.props[funcName], funcWrapped]);

        return {
          ...wrappedFuncProps,
          [funcName]: funcWrapped
        };
      }, {});
    }

    render(customProps = {}) {
      const wrappedProps = {
        ...this.props,
        ...this.getWrappedAnalyticsEvents()
      };

      return <WrappedComponent {...wrappedProps} {...customProps} />;
    }
  }

  WithTracking.displayName = `WithTracking(${componentName})`;

  hoistNonReactStatic(WithTracking, WrappedComponent);

  WithTracking.contextTypes = trackingContextTypes;
  WithTracking.propTypes = WrappedComponent.propTypes;
  WithTracking.defaultProps = WrappedComponent.defaultProps;

  return WithTracking;
};
