/* eslint-env browser */

import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import { HiddenDiv, InlineMessage } from "@times-components/ts-components";

import Comments from "./comments";

import DisabledComments from "./disabled-comments";
import { CommentContainer } from "./styles/responsive";
import JoinTheConversationDialog from "./join-the-conversation-dialog";

const ArticleComments = ({
  articleId,
  isEnabled,
  isReadOnly,
  commentingConfig,
  realnameInlineBlueBanner
}) =>
  isEnabled ? (
    <>
      <UserState state={UserState.showJoinTheConversationDialog}>
        <JoinTheConversationDialog />
      </UserState>
      <UserState state={UserState.showCommentingModule}>
        <CommentContainer>
          <HiddenDiv
            className="comment-banner"
            style={{
              display: `${realnameInlineBlueBanner ? "block" : "none"}`
            }}
          >
            <InlineMessage title="Real-name comments" type="info">
              We&apos;ve changed our policy - if you need to,{" "}
              <a href="https://home.thetimes.co.uk/">
                edit your screen name here
              </a>
              .
            </InlineMessage>
          </HiddenDiv>
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
  }).isRequired,
  realnameInlineBlueBanner: PropTypes.bool.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
