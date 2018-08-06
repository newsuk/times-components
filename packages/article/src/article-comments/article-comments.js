import React from "react";
import PropTypes from "prop-types";
import Comments from "./comments";
import DisabledComments from "./disabled-comments";

const ArticleComments = props => {
  const { commentsEnabled } = props;
  return commentsEnabled ? (
    <Comments {...props} />
  ) : (
    <DisabledComments {...props} />
  );
};

ArticleComments.propTypes = {
  ...Comments.propTypes,
  ...DisabledComments.propTypes,
  commentsEnabled: PropTypes.bool.isRequired
};

export default ArticleComments;
