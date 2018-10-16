import PropTypes from "prop-types";
import { propTypesBase as articleItemPropTypes } from "./article-list-item-prop-types";

export const propTypes = {
  articleListHeader: PropTypes.element,
  articles: PropTypes.arrayOf(PropTypes.shape(articleItemPropTypes)),
  articlesLoading: PropTypes.bool,
  emptyStateMessage: PropTypes.string.isRequired,
  error: PropTypes.object, // ApolloError, TS will be better here
  pageSize: PropTypes.number,
  receiveChildList: PropTypes.func,
  refetch: PropTypes.func.isRequired
};

export const defaultProps = {
  articleListHeader: null,
  articles: [],
  error: null,
  pageSize: 10,
  receiveChildList: () => {}
};
