import PropTypes from "prop-types";
import { propTypesBase as articleItemPropTypes } from "./article-list-item-prop-types";

export const propTypes = {
  articleListHeader: PropTypes.element,
  articles: PropTypes.arrayOf(PropTypes.shape(articleItemPropTypes)),
  articlesLoading: PropTypes.bool,
  emptyStateMessage: PropTypes.string.isRequired,
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
