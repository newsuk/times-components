import PropTypes from "prop-types";
import ArticleMeta from "../article-meta/article-meta-prop-types";

const articlePagePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
  article: PropTypes.shape({
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
  receiveChildList: PropTypes.func
};

const articlePageDefaultProps = {
  article: null,
  error: null,
  isLoading: false,
  receiveChildList: () => {}
};

export { articlePagePropTypes, articlePageDefaultProps };
