import PropTypes from "prop-types";
import ArticleHeader from "./article-header/article-header";
import ArticleMeta from "./article-meta/article-meta";

const articlePagePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  article: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
    // Could have more here.
  }),
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    message: PropTypes.string,
    networkError: PropTypes.shape({
      message: PropTypes.string
    })
  }),
  isLoading: PropTypes.bool
};

const articlePageDefaultProps = {
  article: null,
  error: null,
  isLoading: false
};

export { articlePagePropTypes, articlePageDefaultProps };
