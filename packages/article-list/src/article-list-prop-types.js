import PropTypes from "prop-types";
import Pagination from "@times-components/pagination";

export const propTypes = {
  ...Pagination.propTypes,
  articleListHeader: PropTypes.element,
  articles: PropTypes.arrayOf(PropTypes.shape()),
  articlesLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  onArticlePress: PropTypes.func,
  onViewed: PropTypes.func,
  receiveChildList: PropTypes.func
};

export const defaultProps = {
  articleListHeader: null,
  articles: [],
  onViewed: () => {},
  receiveChildList: () => {}
};
