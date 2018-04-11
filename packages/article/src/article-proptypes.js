import PropTypes from "prop-types";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";

const articlePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  article: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
  }),
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    message: PropTypes.string,
    networkError: PropTypes.shape({
      message: PropTypes.string
    })
  }),
  isLoading: PropTypes.bool,
  onRelatedArticlePress: PropTypes.func.isRequired
};

const articleDefaultProps = {
  article: null,
  error: null,
  isLoading: false
};

export { articlePropTypes, articleDefaultProps };
