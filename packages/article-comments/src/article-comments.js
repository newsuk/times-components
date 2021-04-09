import React from "react";
import PropTypes from "prop-types";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";

const ArticleComments = ({
  articleId,
  commentCount,
  commentsEnabled,
  onCommentGuidelinesPress,
  onCommentsPress,
  url
}) =>
  commentsEnabled ? (
    <Comments
      articleId={articleId}
      commentCount={commentCount}
      onCommentsPress={onCommentsPress}
      url={url}
    />
  ) : (
    <DisabledComments onCommentGuidelinesPress={onCommentGuidelinesPress} />
  );

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  commentCount: PropTypes.number,
  commentsEnabled: PropTypes.bool,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  commentCount: 0,
  commentsEnabled: false
};

export default ArticleComments;
