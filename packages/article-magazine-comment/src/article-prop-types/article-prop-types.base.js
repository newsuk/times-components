import PropTypes from "prop-types";

const articlePagePropTypes = {
  adConfig: PropTypes.shape({}).isRequired,
  analyticsStream: PropTypes.func.isRequired,
  article: PropTypes.shape({}),
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
  isLoading: false
};

export { articlePagePropTypes, articlePageDefaultProps };
