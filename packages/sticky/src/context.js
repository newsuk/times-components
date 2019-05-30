/* eslint-disable react/no-unused-state,no-shadow */
import React, { Component } from "react";
import PropTypes from "prop-types";
import getDisplayName from "react-display-name";
import hoistNonReactStatic from "hoist-non-react-statics";

import { getTop } from "./util";

const { Provider, Consumer } = React.createContext({ top: 0 });

export class StickyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { top: 0 };
    this.ref = this.ref.bind(this);
  }

  ref(node) {
    const top = getTop(node) || 0;

    this.setState({ top });
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

export function withStickyContext(WrappedComponent) {
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
