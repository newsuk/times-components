import PropTypes from "prop-types";

const articlePagePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  article: PropTypes.shape({
  }),
  error: PropTypes.shape({
    graphQLErrors: PropTypes.array,
    message: PropTypes.string,
    networkError: PropTypes.shape({
      message: PropTypes.string
    })
  }),
  isLoading: PropTypes.bool,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  pageSection: PropTypes.string,
  receiveChildList: PropTypes.func
};

const articlePageDefaultProps = {
  article: null,
  error: null,
  isLoading: false,
  pageSection: null,
  receiveChildList: () => {}
};

export { articlePagePropTypes, articlePageDefaultProps };
