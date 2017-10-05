import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import _get from "lodash.get";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import withTrackView from "./track-view";
import resolveAttrs from "./resolve-attrs";

const withTrackingContext = (
  WrappedComponent,
  { getAttrs = () => ({}), trackingObject } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackingContext extends Component {
    getChildContext() {
      const self = this;

      return {
        tracking: {
          analytics(e) {
            const trackingEvent = {
              component: e.component,
              action: e.action,
              attrs: {
                ...resolveAttrs(getAttrs, self.props),
                ...e.attrs
              }
            };

            if (e.object || trackingObject) {
              trackingEvent.object = e.object || trackingObject;
            }

            if (self.isRootTrackingContext()) {
              trackingEvent.attrs.eventTime = new Date().toISOString();
            }

            self.analyticsStream(trackingEvent);
          }
        }
      };
    }

    componentWillMount() {
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

    isRootTrackingContext() {
      return !_get(this.context, "tracking");
    }

    analyticsStream(...args) {
      const stream =
        _get(this.context, "tracking.analytics") || this.props.analyticsStream;
      return stream && stream(...args);
    }

    render() {
      const Wrapped = this.isRootTrackingContext()
        ? withTrackView(WrappedComponent, {
            trackView: true,
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
