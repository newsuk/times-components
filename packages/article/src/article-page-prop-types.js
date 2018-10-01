import PropTypes from "prop-types";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";

const articlePagePropTypes = {
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
  pageSection: PropTypes.string,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired
};

const articlePageDefaultProps = {
  article: null,
  error: null,
  pageSection: null,
  isLoading: false
};

export { articlePagePropTypes, articlePageDefaultProps };
