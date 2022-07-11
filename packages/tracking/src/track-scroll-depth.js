/* eslint-env browser */
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

  class WithTrackScrollDepth extends Component {
    constructor(props, context) {
      super(props, context);
      this.receiveChildList = this.receiveChildList.bind(this);
      this.updateOnScroll = this.updateOnScroll.bind(this);
      this.childData = {};
      this.isOnScroll = false;
      this.viewed = new Set();
      if (typeof window !== "undefined" && window.IntersectionObserver) {
        this.observer = new window.IntersectionObserver(
          this.onObserved.bind(this),
          {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
          }
        );
      }
      this.childList = [];
    }

    componentDidMount() {
      window.addEventListener("scroll", this.updateOnScroll);
      this.observeChildren();
    }

    componentDidUpdate() {
      this.observeChildren();
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.updateOnScroll);
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    onObserved(observed = []) {
      const { tracking } = this.context;
      if (!tracking) {
        return;
      }

      observed.forEach(({ isIntersecting, target }) => {
        if (this.isOnScroll && isIntersecting && !this.viewed.has(target.id)) {
          this.viewed.add(target.id);

          this.onChildView(this.childData[target.id]);
        }
      });
    }

    onChildView(childProps) {
      const { tracking } = this.context;
      tracking.analytics({
        action: "Scrolled",
        attrs: {
          ...resolveAttrs(getAttrs, childProps),
          scrollDepth: {
            itemNumber: childProps.index + 1,
            name: childProps.name,
            total: childProps.total
          }
        },
        component: childProps.eventNavigationName
          ? childProps.eventNavigationName
          : `${trackingName || componentName}Child`
      });
    }

    updateOnScroll() {
      this.isOnScroll = true;
    }

    receiveChildList(childList) {
      this.childList = childList;
    }

    observeChildren() {
      if (this.observer && this.childList)
        this.childList.forEach((props, index) => {
          if (!this.childData[props.elementId]) {
            this.observeChild({
              ...props,
              index,
              total: this.childList.length
            });
          }
        });
    }

    observeChild(props) {
      const el = document.getElementById(props.elementId);
      if (el) {
        this.observer.observe(el);
        this.childData[props.elementId] = props;
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
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
