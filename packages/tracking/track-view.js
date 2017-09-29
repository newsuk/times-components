import React, { Component } from "react";
import PropTypes from "prop-types";
import _get from "lodash.get";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

export default class TrackView extends Component {
  componentDidMount() {
    if (!this.context || !this.context.tracking) {
      return;
    }

    this.context.tracking.analytics({
      component:
        this.props.trackingName ||
        _get(this.props, "children.type.name", "Unknown"),
      action: "Viewed",
      attrs: resolveAttrs(
        this.props.getAttrs,
        _get(this.props, "children.props", {})
      )
    });
  }
  render() {
    return this.props.children;
  }
}

TrackView.contextTypes = trackingContextTypes;
TrackView.propTypes = {
  trackingName: PropTypes.string,
  children: PropTypes.element.isRequired,
  getAttrs: PropTypes.func
};
TrackView.defaultProps = {
  getAttrs: () => ({}),
  trackingName: undefined
};

export const withTrackView = (WrappedComponent, trackingProps) => {
  const WithTrackView = props => (
    <TrackView {...trackingProps}>
      <WrappedComponent {...props} />
    </TrackView>
  );
  return WithTrackView;
};
