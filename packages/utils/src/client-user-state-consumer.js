/**
 * This is a component to allow you to access the client user
 * state in a server-side-render compatible manner.
 *
 * If you use anything in `window.nuk.user` in the initial
 * client side render, you could break React hydration as
 * it could cause a difference between the initial renders
 * on the front end and on the server.
 *
 * This uses two-pass rendering to prevent differences in the
 * initial render on server and client.
 *
 * https://reactjs.org/docs/react-dom.html#hydrate
 */

/* eslint-env browser */

import React, { Component } from "react";
import PropTypes from "prop-types";
import Context from "@times-components/context";

class ClientUserStateConsumer extends Component {
  constructor(props) {
    super(props);
    this.state = { isClient: false };
  }

  componentDidMount() {
    this.setState({ isClient: true });
  }

  render() {
    return (
      <Context.Consumer>
        {({ user }) => {
          const { isClient } = this.state;
          const { twoPassRenderSlowly } = this.props;

          return twoPassRenderSlowly({
            user: isClient
              ? {
                  ...user,
                  ...window.nuk.user
                }
              : user
          });
        }}
      </Context.Consumer>
    );
  }
}

ClientUserStateConsumer.propTypes = {
  twoPassRenderSlowly: PropTypes.func.isRequired
};

export default ClientUserStateConsumer;
