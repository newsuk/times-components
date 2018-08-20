import PropTypes from "prop-types";
import { relatedArticleItemPropTypes } from "./related-article-item-prop-types";

export default {
  slice: PropTypes.shape({
    lead: relatedArticleItemPropTypes.article,
    opinion: relatedArticleItemPropTypes.article,
    sliceName: PropTypes.string.isRequired,
    standardArticles: PropTypes.arrayOf(relatedArticleItemPropTypes.article),
    supports: PropTypes.arrayOf(relatedArticleItemPropTypes.article)
  }).isRequired
};
