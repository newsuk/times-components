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
/* eslint-disable react/require-default-props */

import React from "react";
import PropTypes from "prop-types";
import Context from "@times-components/context";
import { ServerClientRender } from "@times-components/utils";

// Using React Components for the Client/Server for performance reasons
function Client({ children, user }) {
  const { nuk = {} } = window;
  const clientUser = nuk.user || {};

  return children({ user: { ...user, ...clientUser } });
}

function Server({ children, user }) {
  return children({ user });
}

function ClientUserStateConsumer({ children, serverRender = true }) {
  return (
    <Context.Consumer>
      {({ user }) => (
        <ServerClientRender
          client={<Client {...{ children, user }} />}
          server={serverRender ? <Server {...{ children, user }} /> : null}
        />
      )}
    </Context.Consumer>
  );
}

ClientUserStateConsumer.propTypes = {
  children: PropTypes.func.isRequired,
  serverRender: PropTypes.bool
};

export default ClientUserStateConsumer;
