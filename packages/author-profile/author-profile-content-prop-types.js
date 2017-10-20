import PropTypes from "prop-types";
import AuthorHead from "@times-components/author-head";
import Pagination from "@times-components/pagination";

export default {
  ...AuthorHead.propTypes,
  ...Pagination.propTypes,
  articles: PropTypes.arrayOf(PropTypes.shape()),
  onArticlePress: PropTypes.func
};
