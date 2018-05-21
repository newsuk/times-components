import PropTypes from "prop-types";

export const propTypes = {
  articleListHeader: PropTypes.element,
  articles: PropTypes.arrayOf(PropTypes.shape()),
  articlesLoading: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  onArticlePress: PropTypes.func.isRequired,
  onViewed: PropTypes.func,
  receiveChildList: PropTypes.func
};

export const defaultProps = {
  articleListHeader: null,
  articles: [],
  isLoading: true,
  onArticlePress: () => {},
  onViewed: () => {},
  receiveChildList: () => {}
};
