/* eslint-disable no-shadow,react/forbid-prop-types */
/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";
import { getTop } from "./util";
import { withStickyContext, StickyProvider } from "./context";

const GlobalStickyStyles = createGlobalStyle`
  .tc-sticky-container {
    position: sticky;
  }
`;

const isOutOfView = (node, top) => getTop(node) <= top + 1;

class UnwrappedSticky extends Component {
  constructor(props) {
    super(props);

    this.updateSticky = this.updateSticky.bind(this);
    this.containerRef = React.createRef();
    this.isSticky = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.updateSticky);
    window.addEventListener("resize", this.updateSticky);
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
    const { stickyContext } = this.props;
    const container = this.containerRef.current;

    if (!container) {
      return;
    }

    const shouldBeSticky = isOutOfView(container, stickyContext.top);

    if (this.doesStickyNeedUpdating(shouldBeSticky)) {
      this.setSticky(container, shouldBeSticky);
    }
  }

  render() {
    const {
      Component,
      style,
      children,
      className,
      stickyContext,
      zIndex
    } = this.props;
    return (
      <Component
        className={`${className} tc-sticky-container`}
        ref={this.containerRef}
        style={{ zIndex, ...style, top: stickyContext.top }}
      >
        <GlobalStickyStyles />
        {children}
      </Component>
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
  zIndex: PropTypes.number
};

UnwrappedSticky.defaultProps = {
  Component: "div",
  className: "",
  children: null,
  style: {},
  stickyClassName: "sticky",
  stickyContext: { top: 0 },
  zIndex: 999
};

const Sticky = withStickyContext(UnwrappedSticky);

export { UnwrappedSticky, StickyProvider };

export default Sticky;
