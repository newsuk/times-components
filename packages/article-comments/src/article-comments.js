import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import {
  InlineDialog,
  // InlineMessage,
  HiddenDiv
} from "@times-components/ts-components";

import Comments from "./comments";
import getStoreLink from "./utils";

import DisabledComments from "./disabled-comments";
import { CommentContainer } from "./styles/responsive";

const ArticleComments = ({
  articleId,
  publishedTime,
  isEnabled,
  isReadOnly,
  commentingConfig
}) =>
  isEnabled ? (
    <>
      <UserState state={UserState.metered}>
        <InlineDialog
          title="Join the conversation"
          buttonText="Subscribe now"
          href={getStoreLink()}
        >
          Commenting is only available to unlimited access subscribers. Upgrade
          your subscription to have your say.
        </InlineDialog>
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
          publishedTime={publishedTime}
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
  publishedTime: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  commentingConfig: PropTypes.shape({
    accounts: PropTypes.shape({
      current: PropTypes.string.isRequired,
      readOnly: PropTypes.string.isRequired
    }),
    switchOver: PropTypes.string.isRequired
  }).isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
