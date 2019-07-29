/* eslint-disable no-shadow,react/forbid-prop-types,no-param-reassign */
/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { getTopFromBody, isOutOfView } from "./util";
import { defaultContext, withStickyContext } from "./context";
import { applyProgressAttr } from "./progress-styles";
import { CONTAINS_STICKY_CLASSNAME, STICKY_CLASS_NAME } from "./selectors";

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
    delete this.placeholderBox;

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
    const { node = document.body } = stickyContext;
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

      node.appendChild(container);

      placeholder.style.cssText += `
        margin-top: ${styles.marginTop || 0};
        margin-bottom: ${styles.marginBottom || 0};
        height: ${styles.height || 0};
        display: block;
      `;

      placeholder.parentNode.classList.add(CONTAINS_STICKY_CLASSNAME);

      this.updateSizer();
    } else {
      component.classList.remove(STICKY_CLASS_NAME);
      placeholder.parentNode.classList.remove(CONTAINS_STICKY_CLASSNAME);
      placeholder.parentNode.insertBefore(container, placeholder.nextSibling);
      placeholder.style.display = "none";
      container.setAttribute("style", "");
      sizer.setAttribute("style", "");
    }
  }

  setScrollProgressPercent(percent) {
    if (percent === this.placeholderProgress) {
      return;
    }

    this.placeholderProgress = percent;

    applyProgressAttr(this.component, percent);
  }

  doesStickyNeedUpdating(shouldBeSticky) {
    return shouldBeSticky !== this.isSticky;
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

  updateSticky() {
    const { stickyContext, shouldBeSticky } = this.props;
    const { component, placeholder, isSticky } = this;

    if (!placeholder || !component) {
      return;
    }

    const shouldCurrentlyBeSticky =
      shouldBeSticky() &&
      isOutOfView(isSticky ? placeholder : component, stickyContext.top);

    if (this.doesStickyNeedUpdating(shouldCurrentlyBeSticky)) {
      this.setSticky(shouldCurrentlyBeSticky);
    }

    this.trackScrollProgress();
  }

  trackScrollProgress() {
    const { isSticky } = this;
    const { stickyContext } = this.props;

    if (!isSticky) {
      delete this.placeholderBox;

      this.setScrollProgressPercent(0);

      return;
    }

    if (!this.placeholderBox) {
      this.placeholderBox = {
        top: getTopFromBody(this.placeholder),
        height: this.placeholder.offsetHeight
      };
    }

    const { top, height } = this.placeholderBox;
    const distance = (top - window.pageYOffset - stickyContext.top) * -1;
    const percent = Math.max(0, Math.min(1, distance / height));

    this.setScrollProgressPercent(percent);
  }

  updateStickyOnResize() {
    delete this.placeholderBox;

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
        height: 100%;
        box-sizing: border-box;
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
  // @todo Update prop-types and eslint to avoid needing to disable this rule
  // eslint-disable-next-line react/no-typos
  Component: PropTypes.elementType,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  stickyContext: PropTypes.shape({
    top: PropTypes.number.isRequired,
    node: PropTypes.object
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

export { mediaQuery } from "./util";
export { computeProgressStyles, PROGRESS_ATTR_NAME } from "./progress-styles";
export { selectors } from "./selectors";
export { StickyProvider } from "./context";

export { UnwrappedSticky, STICKY_CLASS_NAME };

export default Sticky;
