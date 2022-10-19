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
  showSaveAndShareBar,
  showArticleExtras,
  showTopicTags,
  showArticleSaveButton,
  showTokenisedEmailShare,
  showCommentingModule,
  showJoinTheConversationDialog
} from "./matchers";

function UserState({
  state: shouldRenderInCurrentUserState,
  children,
  fallback,
  serverRender
}) {
  return (
    <ClientUserStateConsumer serverRender={serverRender}>
      {({ user }) =>
        shouldRenderInCurrentUserState(user) ? children : fallback
      }
    </ClientUserStateConsumer>
  );
}

UserState.showSaveAndShareBar = showSaveAndShareBar;
UserState.showArticleExtras = showArticleExtras;
UserState.showTopicTags = showTopicTags;
UserState.showArticleSaveButton = showArticleSaveButton;
UserState.showTokenisedEmailShare = showTokenisedEmailShare;
UserState.showCommentingModule = showCommentingModule;
UserState.showJoinTheConversationDialog = showJoinTheConversationDialog;

UserState.propTypes = {
  state: PropTypes.func.isRequired,
  children: PropTypes.node,
  fallback: PropTypes.node,
  serverRender: PropTypes.bool
};

UserState.defaultProps = {
  children: null,
  serverRender: true,
  fallback: null
};

export { default as mockUserState } from "./mock-user-state";
export { default as USER_STATES } from "./states";
export { default as addUserStateKnobs } from "./storybook-helper";

export default UserState;
