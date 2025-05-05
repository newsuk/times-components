import PropTypes from "prop-types";
import { relatedArticleItemPropTypes } from "./related-article-item-prop-types";

export default {
  slice: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        article: relatedArticleItemPropTypes.article
      })
    ),
    sliceName: PropTypes.string.isRequired
  }).isRequired
};
