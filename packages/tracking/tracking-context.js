import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import trackingContextTypes from "./tracking-context-types";
import TrackView from "./track-view";
import resolveAttrs from "./resolve-attrs";

export default class TrackingContext extends Component {
  constructor(props, context) {
    super(props, context);

    if (this.isRootTrackingContext()) {
      if (!this.props.trackingObject) {
        throw new TypeError("Missing prop trackingObject of TrackingContext");
      }
      if (!this.props.analyticsStream) {
        throw new TypeError("Missing prop analyticsStream of TrackingContext");
      }
    }
  }

  getChildContext() {
    const self = this;
    const getAttrs = this.props.getAttrs;

    return {
      tracking: {
        analytics(e) {
          const trackingEvent = {
            component: e.component,
            action: e.action,
            attrs: {
              ...resolveAttrs(getAttrs, self.props.children.props),
              ...e.attrs
            }
          };

          if (e.object || self.props.trackingObject) {
            trackingEvent.object = e.object || self.props.trackingObject;
          }

          if (self.isRootTrackingContext()) {
            trackingEvent.attrs.eventTime = new Date().toISOString();
          }

          self.analyticsStream(trackingEvent);
        }
      }
    };
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
    return this.isRootTrackingContext() ? (
      <TrackView trackingName="Page">{this.props.children}</TrackView>
    ) : (
      this.props.children
    );
  }
}
TrackingContext.contextTypes = trackingContextTypes;
TrackingContext.childContextTypes = trackingContextTypes;
TrackingContext.propTypes = {
  analyticsStream: PropTypes.func,
  children: PropTypes.element.isRequired,
  trackingObject: PropTypes.string,
  getAttrs: PropTypes.func
};
TrackingContext.defaultProps = {
  trackingObject: undefined,
  analyticsStream: undefined,
  getAttrs: () => ({})
};

export const withTrackingContext = (WrappedComponent, trackingProps) => {
  const WithTrackingContext = props => (
    <TrackingContext {...trackingProps}>
      <WrappedComponent {...props} />
    </TrackingContext>
  );
  return WithTrackingContext;
};
