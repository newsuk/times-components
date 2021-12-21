import React from "react";
import PropTypes from "prop-types";
import UserState from "@times-components/user-state";
import { InlineDialog } from "@times-components/ts-components";

import Comments from "./comments";

import DisabledComments from "./disabled-comments";

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
          buttonText="Subscribe Now"
          onClick={() => console.log("clicked")}
        >
          Commenting is only for subscribers. If you would like to comment,
          please sign up.
        </InlineDialog>
      </UserState>
      <UserState state={UserState.subscriber}>
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
