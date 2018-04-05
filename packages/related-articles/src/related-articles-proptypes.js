import PropTypes from "prop-types";
import { relatedArticleItemPropTypes } from "./related-article-item-proptypes";

export const relatedArticlesPropTypes = {
  articles: PropTypes.arrayOf(relatedArticleItemPropTypes.article),
  mainId: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  template: PropTypes.string
};

export const relatedArticlesDefaultProps = {
  articles: [],
  mainId: "",
  template: "DEFAULT"
};
