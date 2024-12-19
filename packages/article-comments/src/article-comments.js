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
  storefrontConfig,
  domainSpecificUrl,
  hasCommentingEntitlement
}) =>
  isEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog storefrontConfig={storefrontConfig} />
      </UserState>
      {hasCommentingEntitlement && (
        <UserState state={UserState.showCommentingModule}>
          <Comments
            articleId={articleId}
            isReadOnly={isReadOnly}
            commentingConfig={commentingConfig}
            domainSpecificUrl={domainSpecificUrl}
          />
        </UserState>
      )}
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
  domainSpecificUrl: PropTypes.string.isRequired,
  hasCommentingEntitlement: PropTypes.bool.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
