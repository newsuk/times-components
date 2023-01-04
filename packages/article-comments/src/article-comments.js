/* eslint-env browser */

import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import { InlineMessage } from "@times-components/ts-components";

import Comments from "./comments";

import DisabledComments from "./disabled-comments";
import { CommentContainer } from "./styles/responsive";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig
}) =>
  isEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog />
      </UserState>
      <UserState state={UserState.showCommentingModule}>
        <CommentContainer>
          <InlineMessage title="Real-name comments" type="info">
            Our policy is now for commenters to use real names. You may{" "}
            <a href="https://home.thetimes.co.uk/">
              edit your screen name here
            </a>
            .
          </InlineMessage>
        </CommentContainer>
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
  }).isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
