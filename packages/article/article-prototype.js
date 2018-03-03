import PropTypes from "prop-types";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";

const ArticlePrototype = {
  article: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
  })
};

export default ArticlePrototype;
