import PropTypes from "prop-types";
import relatedArticleItemPropTypes from "./related-article-item-proptypes";

export const relatedArticlesPropTypes = {
  articles: PropTypes.arrayOf(relatedArticleItemPropTypes.article),
  onPress: PropTypes.func.isRequired,
  template: PropTypes.string
};

export const relatedArticlesDefaultProps = {
  template: "DEFAULT"
};
