import PropTypes from "prop-types";
import { relatedArticleItemPropTypes } from "./related-article-item-prop-types";

export const propTypes = {
  lead: relatedArticleItemPropTypes.article,
  onPress: PropTypes.func.isRequired,
  opinion: relatedArticleItemPropTypes.article,
  sliceName: PropTypes.string.isRequired,
  standardArticles: PropTypes.arrayOf(relatedArticleItemPropTypes.article),
  supports: PropTypes.arrayOf(relatedArticleItemPropTypes.article)
};

export const defaultProps = {
  lead: null,
  opinion: null,
  standardArticles: [],
  supports: []
};
