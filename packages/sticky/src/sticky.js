/* eslint-disable no-shadow,react/forbid-prop-types,no-param-reassign */
/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { isOutOfView } from "./util";
import { withStickyContext, StickyProvider, defaultContext } from "./context";

export const STICKY_CLASS_NAME = "tc-sticky";

class UnwrappedSticky extends Component {
  constructor(props) {
    super(props);

    this.updateSticky = this.updateSticky.bind(this);
    this.updateStickyOnResize = this.updateStickyOnResize.bind(this);
    this.createContainerRef = this.createContainerRef.bind(this);
    this.isSticky = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateSticky);
    window.addEventListener("resize", this.updateStickyOnResize);

    this.updateSticky();
  }

  componentDidUpdate() {
    if (this.isSticky) {
      this.setSticky(false);
    }

    this.updateSticky();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateSticky);
    window.removeEventListener("resize", this.updateStickyOnResize);

    if (this.isSticky) {
      this.setSticky(false);
    }
  }

  setSticky(shouldBeSticky) {
    const { placeholder, container, component, sizer } = this;

    if (!placeholder || !container || !component || !sizer) {
      return;
    }

    const { stickyContext, zIndex } = this.props;
    this.isSticky = shouldBeSticky;

    if (shouldBeSticky) {
      const styles = window.getComputedStyle(component);

      container.style.cssText += `
        top: ${stickyContext.top}px;
        z-index: ${zIndex};
        position: fixed;
        left: 0;
        width: 100%;
        transform: translateY(-${styles.marginTop}); 
      `;

      component.classList.add(STICKY_CLASS_NAME);

      document.body.appendChild(container);

      placeholder.style.cssText += `
        margin-top: ${styles.marginTop};
        margin-bottom: ${styles.marginBottom};
        height: ${styles.height};
        display: block;
      `;

      this.updateSizer();
    } else {
      component.classList.remove(STICKY_CLASS_NAME);
      placeholder.parentNode.insertBefore(container, placeholder.nextSibling);
      placeholder.style.display = "none";
      container.setAttribute("style", "");
      sizer.setAttribute("style", "");
    }
  }

  createContainerRef(node) {
    this.container = node;

    if (node) {
      this.component = node.firstElementChild;
      this.sizer = this.component.firstElementChild;
      this.placeholder = this.container.previousSibling;

      this.updateSticky();
    } else {
      delete this.component;
      delete this.sizer;
      delete this.placeholder;
    }
  }

  doesStickyNeedUpdating(shouldBeSticky) {
    return shouldBeSticky !== this.isSticky;
  }

  updateSticky() {
    const { stickyContext, shouldBeSticky } = this.props;
    const { container, placeholder, isSticky } = this;

    if (!container || !placeholder) {
      return;
    }

    const shouldCurrentlyBeSticky =
      shouldBeSticky() &&
      isOutOfView(isSticky ? placeholder : container, stickyContext.top);

    if (this.doesStickyNeedUpdating(shouldCurrentlyBeSticky)) {
      this.setSticky(shouldCurrentlyBeSticky);
    }
  }

  updateStickyOnResize() {
    this.updateSticky();
    this.updateSizer();
  }

  updateSizer() {
    const { sizer, placeholder, isSticky } = this;

    if (isSticky) {
      const rect = placeholder.getBoundingClientRect();

      sizer.style.cssText += `
        width: ${rect.width}px;
        margin-left: ${rect.left}px;
      `;
    }
  }

  render() {
    const { Component, style, children, className } = this.props;
    return (
      <>
        <div style={{ display: "none" }} data-tc-sticky-placeholder />
        <div data-tc-sticky-container ref={this.createContainerRef}>
          <Component className={className} style={style}>
            <div data-tc-sticky-sizer>{children}</div>
          </Component>
        </div>
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
    top: PropTypes.number.isRequired
  }),
  zIndex: PropTypes.string,
  shouldBeSticky: PropTypes.func
};

UnwrappedSticky.defaultProps = {
  Component: "div",
  className: "",
  children: null,
  stickyContext: { ...defaultContext },
  style: {},
  zIndex: "999",
  shouldBeSticky: () => true
};

const Sticky = withStickyContext(UnwrappedSticky);

const matchMedia =
  (typeof window !== "undefined" && window.matchMedia) ||
  (() => ({ matches: true }));

Sticky.mediaQuery = query => {
  const mql = matchMedia(query);

  return () => mql.matches;
};

export { UnwrappedSticky, StickyProvider };

export default Sticky;
