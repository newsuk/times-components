import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import _get from "lodash.get";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import withTrackRender from "./track-render";
import resolveAttrs from "./resolve-attrs";

const withTrackingContext = (
  WrappedComponent,
  { getAttrs = () => ({}), trackingObject } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackingContext extends Component {
    constructor(props, context) {
      super(props, context);

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
      const self = this;

      return {
        tracking: {
          analytics({ object, component, action, attrs }) {
            const decoratedEvent = {
              component,
              action,
              attrs: {
                ...resolveAttrs(getAttrs, self.props),
                ...attrs
              }
            };

            if (object || trackingObject) {
              decoratedEvent.object = object || trackingObject;
            }

            if (self.isRootTrackingContext()) {
              decoratedEvent.attrs.eventTime = new Date().toISOString();
            }

            self.analyticsStream(decoratedEvent);
          }
        }
      };
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
      const Wrapped = this.isRootTrackingContext()
        ? withTrackRender(WrappedComponent, {
            trackingName: "Page",
            actionName: "Viewed"
          })
        : WrappedComponent;

      return <Wrapped {...this.props} />;
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
