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
      console.log(1)
      this.observeChildren();
    }

    componentDidUpdate() {
      console.log(2)
      this.observeChildren();
    }

    componentWillUnmount() {
      window.removeEventListener("scroll", this.updateOnScroll);
      if (this.observer) {
        this.observer.disconnect();
      }
      console.log(3)
    }

    onObserved(observed = []) {
      const { tracking } = this.context;
      console.log(4, tracking)
      if (!tracking) {
        console.log(5, 'no tracking')
        return;
      }

      observed.forEach(({ isIntersecting, target }) => {
        if (this.isOnScroll && isIntersecting && !this.viewed.has(target.id)) {
          this.viewed.add(target.id);
console.log(6)
          this.onChildView(this.childData[target.id]);
        }
      });
    }

    onChildView(childProps) {
      console.log(111)
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
      console.log(7)
    }

    updateOnScroll() {
      this.isOnScroll = true;
      console.log(8)
    }

    receiveChildList(childList) {
      this.childList = childList;
      console.log(9)
    }

    observeChildren() {
      if (this.observer && this.childList)
      console.log(10, this.observer, this.childlist)
        this.childList.forEach((props, index) => {
          console.log(10.1, this.childData, props )
          if (!this.childData[props.elementId]) {
            console.log(11)
            this.observeChild({
              ...props,
              index,
              total: this.childList.length
            });
          }
        });
    }

    observeChild(props) {
      console.log(12)
      const el = document.getElementById(props.elementId);
      if (el) {
        console.log(13)
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
