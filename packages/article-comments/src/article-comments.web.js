import React from "react";
import PropTypes from "prop-types";
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
    <Comments
      articleId={articleId}
      publishedTime={publishedTime}
      isReadOnly={isReadOnly}
      commentingConfig={commentingConfig}
    />
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
