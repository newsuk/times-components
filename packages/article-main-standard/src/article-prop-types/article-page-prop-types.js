import PropTypes from "prop-types";
import ArticleHeader from "../article-header/article-header";
import ArticleMeta from "../article-meta/article-meta";

const articlePagePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
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
  isLoading: PropTypes.bool,
  receiveChildList: PropTypes.func,
  sharingSavingFlag: PropTypes.bool,
  commentingFlag: PropTypes.bool
};

const articlePageDefaultProps = {
  article: null,
  error: null,
  isLoading: false,
  receiveChildList: () => {},
  commentingFlag: false,
  sharingSavingFlag: false
};

export { articlePagePropTypes, articlePageDefaultProps };
