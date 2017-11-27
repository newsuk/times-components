import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

export default (
  WrappedComponent,
  {
    trackingName,
    getAttrs = () => ({})
  } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackScrollDepth extends Component {
    constructor(props, context) {
      super(props, context);
      this.viewed = new Set();
      this.handleChildViewed = this.handleChildViewed.bind(this);
      this.receiveChildList = this.receiveChildList.bind(this);
      this.childList = [];
    }

    onChildView(childProps) {
      this.context.tracking.analytics({
        component: `${trackingName || componentName}Child`,
        action: "Scrolled",
        attrs: {
          ...resolveAttrs(getAttrs, childProps),
          scrollDepth: {
            index: childProps.index + 1,
            total: childProps.total
          }
        }
      });
    }

    receiveChildList(childList) {
      this.childList = childList;
    }

    handleChildViewed(childData) {
      const elementId = childData.elementId;

      if (this.viewed.has(elementId)) {
        return;
      }

      this.viewed.add(elementId);

      const index = this.childList.findIndex(
        item => item.elementId === elementId
      );

      this.onChildView({ ...childData, total: this.childList.length, index });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onViewed={this.handleChildViewed}
          receiveChildList={this.receiveChildList}
        />
      );
    }
  }

  WithTrackScrollDepth.contextTypes = trackingContextTypes;
  WithTrackScrollDepth.displayName = `WithTrackScrollDepth(${componentName})`;
  WithTrackScrollDepth.propTypes = WrappedComponent.propTypes;
  WithTrackScrollDepth.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackScrollDepth, WrappedComponent);

  return WithTrackScrollDepth;
};
