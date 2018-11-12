import PropTypes from "prop-types";
import ArticleHeader from "../article-header/article-header";

const articlePagePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  analyticsStream: PropTypes.func.isRequired,
  article: PropTypes.shape({
    ...ArticleHeader.propTypes,
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
