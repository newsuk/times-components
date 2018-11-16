import PropTypes from "prop-types";
import {
  articlePropTypesBase,
  articleDefaultPropsBase
} from "./article-prop-types.base";

const articlePropTypes = {
  ...articlePropTypesBase,
  onAuthorPress: PropTypes.func.isRequired,
  onCommentGuidelinesPress: PropTypes.func.isRequired,
  onCommentsPress: PropTypes.func.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  onTwitterLinkPress: PropTypes.func.isRequired,
  onVideoPress: PropTypes.func.isRequired,
  onViewed: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired
};

const articleDefaultProps = {
  ...articleDefaultPropsBase
};

export { articlePropTypes, articleDefaultProps };
