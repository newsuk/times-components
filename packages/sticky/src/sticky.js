/* eslint-disable no-shadow,react/forbid-prop-types */
/* eslint-env browser */

import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { getTop, getTopFromBody } from "./util";
import { withStickyContext, StickyProvider } from "./context";

const isOutOfView = (node, top) => getTop(node) <= top + 1;

class UnwrappedSticky extends Component {
  constructor(props) {
    super(props);

    this.updateSticky = this.updateSticky.bind(this);
    this.syncPlaceholder = this.syncPlaceholder.bind(this);
    this.createContainerRef = this.createContainerRef.bind(this);
    this.createPlaceholderRef = this.createPlaceholderRef.bind(this);
    this.isSticky = false;
  }

  componentDidMount() {
    window.addEventListener("resize", this.syncPlaceholder);
    window.addEventListener("resize", this.updateSticky);
    window.addEventListener("scroll", this.updateSticky);

    this.updateSticky();
    this.syncPlaceholder();
  }

  componentDidUpdate() {
    this.updateSticky();
    this.syncPlaceholder();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.syncPlaceholder);
    window.removeEventListener("resize", this.updateSticky);
    window.removeEventListener("scroll", this.updateSticky);
  }

  setSticky(container, shouldBeSticky) {
    const { stickyClassName } = this.props;
    this.isSticky = shouldBeSticky;

    if (shouldBeSticky) {
      container.classList.add(stickyClassName);
    } else {
      container.classList.remove(stickyClassName);
    }
  }

  doesStickyNeedUpdating(shouldBeSticky) {
    return shouldBeSticky !== this.isSticky;
  }

  updateSticky() {
    const { stickyContext, shouldBeSticky } = this.props;
    const { container, placeholder } = this;

    if (!container || !placeholder) {
      return;
    }

    const isSticky = isOutOfView(placeholder, stickyContext.top) && shouldBeSticky();

    if (this.doesStickyNeedUpdating(isSticky)) {
      this.setSticky(container, isSticky);
      this.syncPlaceholder();
    }
  }

  syncPlaceholder() {
    const { container, placeholder, isSticky } = this;
    const { stickyContext, wide, zIndex } = this.props;

    if (!container || !placeholder) {
      return;
    }

    const { style } = container;

    style.width = isSticky && wide ? "100%" : `${placeholder.offsetWidth}px`;

    const containerStyles = window.getComputedStyle(container);
    const { marginTop } = containerStyles;

    Object.assign(placeholder.style, {
      marginTop,
      marginBottom: containerStyles.marginBottom,
      height: `${container.offsetHeight}px`
    });

    if (isSticky) {
      style.top = `${stickyContext.top}px`;
      style.position = "fixed";
      style.zIndex = zIndex;
    } else {
      style.top = `${getTopFromBody(placeholder)}px`;
      style.position = "absolute";
      style.zIndex = "initial";
    }

    style.transform = `translate(-50%, -${marginTop})`;
    style.left = "50%";
  }

  createContainerRef(container) {
    this.container = container;

    this.updateSticky();
    this.syncPlaceholder();
  }

  createPlaceholderRef(placeholder) {
    this.placeholder = placeholder;

    this.updateSticky();
    this.syncPlaceholder();
  }

  render() {
    const {
      Component,
      style,
      children,
      className,
      stickyContext
    } = this.props;
    const portalTarget = stickyContext.node ? stickyContext.node.parentNode : document.body;
    return (
      <>
        <div ref={this.createPlaceholderRef} className="tc-sticky-placeholder"  />
        {
          createPortal(
            <Component
              className={`${className} tc-sticky-container`}
              style={style}
              ref={this.createContainerRef}
            >
              {children}
            </Component>,
            portalTarget
          )
        }
      </>
    );
  }
}

UnwrappedSticky.displayName = "Sticky";

UnwrappedSticky.propTypes = {
  Component: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.element,
  stickyClassName: PropTypes.string,
  stickyContext: PropTypes.shape({
    top: PropTypes.number.isRequired
  }),
  zIndex: PropTypes.number,
  wide: PropTypes.bool,
  shouldBeSticky: PropTypes.func
};

UnwrappedSticky.defaultProps = {
  Component: "div",
  className: "",
  children: null,
  style: {},
  stickyClassName: "sticky",
  stickyContext: { top: 0 },
  zIndex: 999,
  wide: false,
  shouldBeSticky: () => true,
};

const Sticky = withStickyContext(UnwrappedSticky);

export { UnwrappedSticky, StickyProvider };

export default Sticky;
