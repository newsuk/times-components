import PropTypes from "prop-types";

const articlePropTypes = {
  analyticsStream: PropTypes.func.isRequired,
  data: PropTypes.shape({
  }),
  observed: PropTypes.object.isRequired,
  onAuthorPress: PropTypes.func.isRequired,
  onRelatedArticlePress: PropTypes.func.isRequired,
  onTopicPress: PropTypes.func.isRequired,
  registerNode: PropTypes.func.isRequired
};

const articleDefaultProps = {
  data: null
};

export { articlePropTypes, articleDefaultProps };
