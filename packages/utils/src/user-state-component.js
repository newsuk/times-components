/**
 * This is a component to assist you in rendering UI that depends on certain
 * user states.
 *
 * Currently, it uses `ClientUserStateConsumer` to render the UI in a
 * safe manner, as we have to deal with state that differs on the client and
 * on the server.
 *
 * However, the API is written in such a way that this can easily be removed
 * once we can rely on the state being the same.
 */
import React from "react";
import PropTypes from "prop-types";
import ClientUserStateConsumer from "./client-user-state-consumer";
import {
  isLoggedIn,
  isMetered,
  isMeteredExpired,
  isNonExpiredUser,
  isShared,
  shouldShowFullArticle,
  isSubscriber
} from "./user-state";

function UserState({ state, children, fallback, serverRender }) {
  return (
    <ClientUserStateConsumer serverRender={serverRender}>
      {({ user }) => (state(user) ? children : fallback)}
    </ClientUserStateConsumer>
  );
}

UserState.loggedIn = isLoggedIn;
UserState.meteredExpired = isMeteredExpired;
UserState.metered = isMetered;
UserState.shared = isShared;
UserState.nonExpiredUser = isNonExpiredUser;
UserState.fullArticle = shouldShowFullArticle;
UserState.subscriber = isSubscriber;

UserState.propTypes = {
  state: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  serverRender: PropTypes.bool
};

UserState.defaultProps = {
  serverRender: true,
  fallback: null
};

export default UserState;
