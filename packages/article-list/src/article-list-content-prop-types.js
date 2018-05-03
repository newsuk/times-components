import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import Pagination from "@times-components/pagination";

export const propTypes = {
  ...AuthorHead.propTypes,
  ...Pagination.propTypes,
  articles: PropTypes.arrayOf(PropTypes.shape()),
  articlesLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  onArticlePress: PropTypes.func,
  onViewed: PropTypes.func,
  receiveChildList: PropTypes.func
};

export const defaultProps = {
  articles: [],
  onViewed: () => {},
  receiveChildList: () => {}
};
