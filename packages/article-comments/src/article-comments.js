/* eslint-env browser */

import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import { HiddenDiv } from "@times-components/ts-components";

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
      <UserState state={UserState.metered}>
        <JoinTheConversationDialog />
      </UserState>
      <UserState state={UserState.subscriber}>
        <CommentContainer>
          <HiddenDiv className="comment-banner">
            {/* <InlineMessage title="Real-name Commenting" type="info">
              We&apos;ve changed our policy and from now on commenters will need
              to use their real names. If you&apos;ve been using a pseudonym,
              please edit your screen name{" "}
              <a href="https://home.thetimes.co.uk/">here</a>. We believe this
              will ensure true debate.
            </InlineMessage> */}
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
  }).isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
