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
  isCommentEnabledFromZephr
}) =>
  isEnabled && isCommentEnabledFromZephr ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog />
      </UserState>
      <UserState state={UserState.showCommentingModule}>
        <Comments
          articleId={articleId}
          isReadOnly={isReadOnly}
          commentingConfig={commentingConfig}
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
  isCommentEnabledFromZephr: PropTypes.bool
};

ArticleComments.defaultProps = {
  isReadOnly: false,
  isCommentEnabledFromZephr: true
};

export default ArticleComments;
