import React from "react";
import PropTypes from "prop-types";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";

const ArticleComments = ({ articleId, isEnabled, isReadOnly, spotAccountId }) =>
  isEnabled ? (
    <Comments
      articleId={articleId}
      isReadOnly={isReadOnly}
      spotAccountId={spotAccountId}
    />
  ) : (
    <DisabledComments />
  );

ArticleComments.propTypes = {
  articleId: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool,
  spotAccountId: PropTypes.string.isRequired
};

ArticleComments.defaultProps = {
  isReadOnly: false
};

export default ArticleComments;
