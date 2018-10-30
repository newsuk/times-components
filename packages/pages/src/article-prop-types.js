import PropTypes from "prop-types";

export const propTypes = {
  analyticsStream: PropTypes.func.isRequired,
  article: PropTypes.shape({}),
  error: PropTypes.shape({}),
  isLoading: PropTypes.bool,
  omitErrors: PropTypes.bool,
  onArticlePress: PropTypes.func.isRequired,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  platformAdConfig: PropTypes.shape({}).isRequired,
  refetch: PropTypes.func,
  scale: PropTypes.string,
  sectionName: PropTypes.string
};

export const defaultProps = {
  article: null,
  error: null,
  isLoading: false,
  omitErrors: false,
  refetch: () => {},
  scale: null,
  sectionName: null
};
