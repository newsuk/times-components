/* eslint-disable no-console */
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
  domainSpecificUrl
}) => {
  console.log(isEnabled, "isEnabled");
  console.log(isCommentEnabled, "isCommentEnabled");
  console.log(UserState, "UserState");
  return isEnabled && isCommentEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
      </UserState>
      <UserState state={UserState.showCommentingModule}>
        <Comments
          articleId={articleId}
          isReadOnly={isReadOnly}
          commentingConfig={commentingConfig}
          domainSpecificUrl={domainSpecificUrl}
        />
      </UserState>
    </>
  ) : (
    <DisabledComments />
  );
};

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  commentingConfig: PropTypes.shape({
    account: PropTypes.string.isRequired
  }).isRequired,
  storefrontConfig: PropTypes.string.isRequired,
  isCommentEnabled: PropTypes.bool,
  domainSpecificUrl: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false,
  isCommentEnabled: true
};

export default ArticleComments;
