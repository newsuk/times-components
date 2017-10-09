import React, { Component } from "react";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";
import trackingContextTypes from "./tracking-context-types";
import resolveAttrs from "./resolve-attrs";

export default (
  WrappedComponent,
  {
    trackingName,
    actionName = "Rendered",
    childIdPropKey,
    getAttrs = () => ({})
  } = {}
) => {
  const componentName = getDisplayName(WrappedComponent);

  class WithTrackChildView extends Component {
    constructor(props, context) {
      super(props, context);
      this.viewed = new Set();
      this.handleChildViewed = this.handleChildViewed.bind(this);
      this.getChildList = this.getChildList.bind(this);
      this.childList = [];
    }

    onChildView(childProps) {
      this.context.tracking.analytics({
        component: `${trackingName || componentName}Child`,
        action: actionName,
        attrs: {
          ...resolveAttrs(getAttrs, childProps),
          scrollDepth: {
            index: childProps.index + 1,
            total: childProps.total
          }
        }
      });
    }

    getChildList(childList) {
      this.childList = childList;
    }

    handleChildViewed(childData) {
      const id = childData[childIdPropKey];

      if (this.viewed.has(id)) {
        return;
      }

      this.viewed.add(id);

      const index = this.childList.findIndex(
        item => item[childIdPropKey] === id
      );

      this.onChildView({ ...childData, total: this.childList.length, index });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onViewed={this.handleChildViewed}
          getChildList={this.getChildList}
        />
      );
    }
  }

  WithTrackChildView.contextTypes = trackingContextTypes;
  WithTrackChildView.displayName = `WithTrackChildView(${componentName})`;
  WithTrackChildView.propTypes = WrappedComponent.propTypes;
  WithTrackChildView.defaultProps = WrappedComponent.defaultProps;
  hoistNonReactStatic(WithTrackChildView, WrappedComponent);

  return WithTrackChildView;
};
