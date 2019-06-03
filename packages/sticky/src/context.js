/* eslint-disable react/no-unused-state,no-shadow */
/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";

import { getTop } from "./util";

const { Provider, Consumer } = React.createContext({ top: 0 });

class StickyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { top: 0 };
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
    const { top } = this.state;

    if (!node) {
      return;
    }

    const newTop = Math.round((getTop(node) || 0) + window.pageYOffset);

    if (newTop !== top) {
      this.setState({ top: newTop });
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
  Component: PropTypes.node,
  children: PropTypes.element.isRequired
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
