import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

export default (
  WrappedComponent,
  { trackingName, getAttrs = () => ({}) } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackView extends Component {
    componentDidMount() {
      if (!this.context || !this.context.tracking) {
        return;
      }

      this.context.tracking.analytics({
        component: trackingName || componentName,
        action: "Viewed",
        attrs: resolveAttrs(getAttrs, this.props)
      });
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithTrackView.contextTypes = trackingContextTypes;
  WithTrackView.displayName = `WithTrackView(${componentName})`;
  WithTrackView.propTypes = WrappedComponent.propTypes;
  WithTrackView.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackView, WrappedComponent);

  return WithTrackView;
};
