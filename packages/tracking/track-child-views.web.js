/* eslint-env browser */
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
      this.getChildList = this.getChildList.bind(this);
      this.childData = {};
      this.viewed = new Set();
      if (window.IntersectionObserver) {
        this.observer = new window.IntersectionObserver(
          this.onObserved.bind(this),
          {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
          }
        );
      }
      this.childList = [];
    }

    componentDidMount() {
      this.observeChildren();
    }

    componentDidUpdate() {
      this.observeChildren();
    }

    componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    onObserved(observed = []) {
      if (!this.context || !this.context.tracking) {
        return;
      }

      observed.forEach(({ isIntersecting, target }) => {
        if (isIntersecting && !this.viewed.has(target.id)) {
          this.viewed.add(target.id);

          this.onChildView(this.childData[target.id]);
        }
      });
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

    observeChildren() {
      this.childList.forEach((props, index) => {
        if (!this.childData[props[childIdPropKey]]) {
          this.observeChild({
            ...props,
            index,
            total: this.childList.length
          });
        }
      });
    }

    observeChild(props) {
      const el = document.getElementById(props[childIdPropKey]);
      if (el) {
        this.observer.observe(el);
        this.childData[props[childIdPropKey]] = props;
      }
    }

    render() {
      return (
        <WrappedComponent {...this.props} getChildList={this.getChildList} />
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
