/* eslint-disable no-shadow,react/forbid-prop-types,no-param-reassign */
/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { getOuterVerticalStyle, isOutOfView } from "./util";
import { withStickyContext, StickyProvider, defaultContext } from "./context";

export const STICKY_CLASS_NAME = "tc-sticky";

class UnwrappedSticky extends Component {
  constructor(props) {
    super(props);

    this.updateSticky = this.updateSticky.bind(this);
    this.createContainerRef = this.createContainerRef.bind(this);
    this.createPlaceholderRef = this.createPlaceholderRef.bind(this);
    this.isSticky = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateSticky);
    window.addEventListener("resize", this.updateSticky);

    this.updateSticky();
  }

  componentDidUpdate() {
    this.updateSticky();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateSticky);
    window.removeEventListener("resize", this.updateSticky);

    if (this.isSticky) {
      this.setSticky(false);
    }
  }

  setSticky(shouldBeSticky) {
    const { placeholder, container } = this;

    if (!placeholder || !container) {
      return;
    }

    const { stickyContext, zIndex } = this.props;
    this.isSticky = shouldBeSticky;

    if (shouldBeSticky) {
      const outerStyles = getOuterVerticalStyle(container);
      Object.assign(placeholder.style, outerStyles);
      container.classList.add(STICKY_CLASS_NAME);
      placeholder.style.removeProperty("display");
      stickyContext.node.parentNode.appendChild(container);
      Object.assign(container.style, {
        top: `${stickyContext.top}px`,
        zIndex,
        position: "fixed",
        left: 0,
        width: "100%",
        transform: `translateY(-${outerStyles.marginTop})`
      });
    } else {
      container.classList.remove(STICKY_CLASS_NAME);
      placeholder.parentNode.insertBefore(container, placeholder.nextSibling);
      placeholder.style.display = "none";
      container.style.removeProperty("top");
      container.style.removeProperty("z-index");
      container.style.removeProperty("position");
      container.style.removeProperty("left");
      container.style.removeProperty("width");
      container.style.removeProperty("transform");
    }
  }

  createContainerRef(node) {
    this.container = node;
    this.updateSticky();
  }

  createPlaceholderRef(node) {
    this.placeholder = node;
    this.updateSticky();
  }

  doesStickyNeedUpdating(shouldBeSticky) {
    return shouldBeSticky !== this.isSticky;
  }

  updateSticky() {
    const { stickyContext, shouldBeSticky } = this.props;
    const { container, placeholder, isSticky } = this;

    if (!container || !placeholder || !stickyContext.node) {
      return;
    }

    const shouldCurrentlyBeSticky =
      shouldBeSticky() &&
      isOutOfView(isSticky ? placeholder : container, stickyContext.top);

    if (this.doesStickyNeedUpdating(shouldCurrentlyBeSticky)) {
      this.setSticky(shouldCurrentlyBeSticky);
    }
  }

  render() {
    const { Component, style, children, className } = this.props;
    return (
      <>
        <div
          ref={this.createPlaceholderRef}
          style={{ display: "none" }}
          data-tc-sticky-placeholder
        />
        <Component
          className={className}
          style={style}
          data-tc-sticky-element
          ref={this.createContainerRef}
        >
          {children}
        </Component>
      </>
    );
  }
}

UnwrappedSticky.displayName = "Sticky";

UnwrappedSticky.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  stickyContext: PropTypes.shape({
    top: PropTypes.number.isRequired,
    node: PropTypes.shape({
      appendChild: PropTypes.func.isRequired
    })
  }),
  zIndex: PropTypes.string,
  shouldBeSticky: PropTypes.func
};

UnwrappedSticky.defaultProps = {
  Component: "div",
  className: "",
  children: null,
  stickyContext: defaultContext,
  style: {},
  zIndex: "999",
  shouldBeSticky: () => true
};

const Sticky = withStickyContext(UnwrappedSticky);

export { UnwrappedSticky, StickyProvider };

export default Sticky;
