/* eslint-env browser */

import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  isCommentEnabled,
  storefrontConfig,
  host
}) =>
  isEnabled && isCommentEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
      </UserState>
      <UserState state={UserState.showCommentingModule}>
        <Comments
          articleId={articleId}
          isReadOnly={isReadOnly}
          commentingConfig={commentingConfig}
          host={host}
        />
      </UserState>
    </>
  ) : (
    <DisabledComments />
  );

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  storefrontConfig: PropTypes.string.isRequired,
  isCommentEnabled: PropTypes.bool,
  host: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false,
  isCommentEnabled: true
};

export default ArticleComments;
