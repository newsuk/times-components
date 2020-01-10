import PropTypes from "prop-types";
import {
  articleDefaultProps as articleDefaultPropsBase,
  articlePropTypes as articlePropTypesBase
} from "./article-prop-types.web";

const articlePropTypes = {
  ...articlePropTypesBase,
  adConfig: PropTypes.shape({}).isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

const articleDefaultProps = {
  ...articleDefaultPropsBase
};

export { articlePropTypes, articleDefaultProps };
