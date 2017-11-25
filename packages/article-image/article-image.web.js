import React from "react";

import ArticleImage from "./component";
import {
  articleImagePropTypes,
  articleImageDefaultPropTypes
} from "./article-image-proptypes";

const ArticleImageWeb = props => {
  return (
      <ArticleImage {...props} />
  );
};

ArticleImageWeb.propTypes = articleImagePropTypes;
ArticleImageWeb.defaultProps = articleImageDefaultPropTypes;

export default ArticleImageWeb;
