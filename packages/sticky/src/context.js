/* eslint-disable react/no-unused-state,no-shadow */
/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";

import { getTopFromBody } from "./util";

export const defaultContext = { top: 0, node: document.body };
const { Provider, Consumer } = React.createContext(defaultContext);

class StickyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultContext };
    this.ref = this.ref.bind(this);
    this.setTop = this.setTop.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.setTop);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setTop);
  }

  setTop() {
    const { node } = this;
    const { top, node: currentNode } = this.state;

    if (!node) {
      return;
    }

    const newTop = Math.round(getTopFromBody(node));

    if (newTop !== top || node !== currentNode) {
      this.setState({ top: newTop, node });
    }
  }

  ref(node) {
    this.node = node;

    this.setTop();
  }

  render() {
    const { Component, children, ...props } = this.props;

    return (
      <Component {...props} ref={this.ref}>
        <Provider value={this.state}>{children}</Provider>
      </Component>
    );
  }
}

StickyProvider.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node.isRequired
};

StickyProvider.defaultProps = {
  Component: "div"
};

function withStickyContext(WrappedComponent) {
  function WithStickyContext(props) {
    return (
      <Consumer>
        {stickyContext => (
          <WrappedComponent {...props} stickyContext={stickyContext} />
        )}
      </Consumer>
    );
  }

  WithStickyContext.displayName = `WithStickyContext(${getDisplayName(
    WrappedComponent
  )})`;
  hoistNonReactStatic(WithStickyContext, WrappedComponent);

  return WithStickyContext;
}

export { StickyProvider, withStickyContext };
