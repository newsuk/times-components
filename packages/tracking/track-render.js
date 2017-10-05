import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

export default (
  WrappedComponent,
  { trackingName, actionName, getAttrs = () => ({}) } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackRender extends Component {
    componentDidMount() {
      if (!this.context || !this.context.tracking) {
        return;
      }

      this.context.tracking.analytics({
        component: trackingName || componentName,
        action: actionName || "Rendered",
        attrs: resolveAttrs(getAttrs, this.props)
      });
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  WithTrackRender.contextTypes = trackingContextTypes;
  WithTrackRender.displayName = `WithTrackRender(${componentName})`;
  WithTrackRender.propTypes = WrappedComponent.propTypes;
  WithTrackRender.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackRender, WrappedComponent);

  return WithTrackRender;
};
