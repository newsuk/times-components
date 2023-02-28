import PropTypes from "prop-types";

const articlePagePropTypes = {
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
  onImagePress: PropTypes.func,
  receiveChildList: PropTypes.func.isRequired,
  zephrDivs: PropTypes.bool,
  sharingSavingFlag: PropTypes.bool,
  commentingFlag: PropTypes.bool
};

const articlePageDefaultProps = {
  article: null,
  error: null,
  isLoading: false,
  onImagePress: null,
  sharingSavingFlag: true,
  commentingFlag: false
};

export { articlePagePropTypes, articlePageDefaultProps };
