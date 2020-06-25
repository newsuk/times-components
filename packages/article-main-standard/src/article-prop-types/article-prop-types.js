import PropTypes from "prop-types";

import ArticleHeader from "../article-header/article-header";
import ArticleMeta from "../article-meta/article-meta";

const articlePropTypesBase = {
  adConfig: PropTypes.shape({}).isRequired,
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({
    ...ArticleHeader.propTypes,
    ...ArticleMeta.propTypes
    // Could have more here
  }),
  receiveChildList: PropTypes.func,
  navigationMode: PropTypes.shape({}).isRequired
};

const articlePropTypes = {
  ...articlePropTypesBase,
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
  data: null,
  receiveChildList: () => {}
};

export { articlePropTypes, articleDefaultProps };
