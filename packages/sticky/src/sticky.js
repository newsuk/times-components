/* eslint-disable no-shadow,react/forbid-prop-types,no-param-reassign */
/* eslint-env browser */

import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import PropTypes from "prop-types";
import { getOuterVerticalStyle, isOutOfView } from "./util";
import { withStickyContext, StickyProvider } from "./context";

const PLACEHOLDER_HIDDEN_CLASS_NAME = "tc-sticky-placeholder-hidden";

export const STICKY_CLASS_NAME = "tc-sticky";

const GlobalStyles = createGlobalStyle`
   .${PLACEHOLDER_HIDDEN_CLASS_NAME} { display: none !important; }
   .${STICKY_CLASS_NAME} {
      position: fixed; 
      margin-top: 0 !important;
      left: 0;
      width: 100%;
   }
`;


class UnwrappedSticky extends Component {
  constructor(props) {
    super(props);

    this.updateSticky = this.updateSticky.bind(this);
    this.containerRef = React.createRef();
    this.placeholderRef = React.createRef();
    this.isSticky = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateSticky);
    window.addEventListener("resize", this.updateSticky);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateSticky);
    window.removeEventListener("resize", this.updateSticky);

    if (this.isSticky && this.container) {
      this.container.parentNode.removeChild(this.container);
    }
  }

  setSticky({ container, placeholder }, shouldBeSticky) {
    const { stickyContext, zIndex } = this.props;
    this.isSticky = shouldBeSticky;

    if (shouldBeSticky) {
      Object.assign(placeholder.style, getOuterVerticalStyle(container));
      container.classList.add(STICKY_CLASS_NAME);
      placeholder.classList.remove(PLACEHOLDER_HIDDEN_CLASS_NAME);
      stickyContext.node.appendChild(container);
      container.style.top = `${stickyContext.top}px`;
      container.style.zIndex = zIndex;
    } else {
      container.classList.remove(STICKY_CLASS_NAME);
      placeholder.classList.add(PLACEHOLDER_HIDDEN_CLASS_NAME);
      placeholder.parentNode.insertBefore(container, placeholder.nextSibling);
      container.style.zIndex = "initial";
    }
  }

  doesStickyNeedUpdating(shouldBeSticky) {
    return shouldBeSticky !== this.isSticky;
  }

  updateSticky() {
    const { stickyContext, shouldBeSticky } = this.props;
    const container = this.containerRef.current;
    const placeholder = this.placeholderRef.current;

    if (!container || !placeholder) {
      return;
    }

    const shouldCurrentlyBeSticky =
      shouldBeSticky() &&
      isOutOfView(this.isSticky ? placeholder : container, stickyContext.top);

    if (this.doesStickyNeedUpdating(shouldCurrentlyBeSticky)) {
      this.setSticky({ container, placeholder }, shouldCurrentlyBeSticky);
    }
  }

  render() {
    const { Component, style, children, className } = this.props;
    return (
      <>
        <GlobalStyles />
        <div
          ref={this.placeholderRef}
          className="tc-sticky-placeholder tc-sticky-placeholder-hidden"
        />
        <Component
          className={`${className} tc-sticky-container`}
          style={style}
          ref={this.containerRef}
        >
          {children}
        </Component>
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
  stickyContext: PropTypes.shape({
    top: PropTypes.number.isRequired
  }),
  zIndex: PropTypes.number,
  shouldBeSticky: PropTypes.func
};

UnwrappedSticky.defaultProps = {
  Component: "div",
  className: "",
  children: null,
  style: {},
  stickyContext: { top: 0 },
  zIndex: 999,
  shouldBeSticky: () => true
};

const Sticky = withStickyContext(UnwrappedSticky);

export { UnwrappedSticky, StickyProvider };

export default Sticky;
