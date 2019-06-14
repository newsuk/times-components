/* eslint-disable no-shadow,react/forbid-prop-types */
/* eslint-env browser */

import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";
import { getTop, getTopFromBody } from "./util";
import { withStickyContext, StickyProvider } from "./context";

const GlobalStickyStyles = createGlobalStyle`
  .tc-sticky-container {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const isOutOfView = (node, top) => getTop(node) <= top + 1;

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
    this.syncPlaceholder();
  }

  componentDidUpdate() {
    this.updateSticky();
    this.syncPlaceholder();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateSticky);
    window.removeEventListener("resize", this.updateSticky);
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
    placeholder.style.height = `${container.offsetHeight}px`;

    if (isSticky) {
      style.top = `${stickyContext.top}px`;
      style.position = "fixed";
      style.zIndex = zIndex;
    } else {
      style.top = `${getTopFromBody(placeholder)}px`;
      style.position = "absolute";
      style.zIndex = "initial";
    }

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
        <GlobalStickyStyles />
        <Component ref={this.createPlaceholderRef} className={`${className} tc-sticky-placeholder`} style={style} />
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
