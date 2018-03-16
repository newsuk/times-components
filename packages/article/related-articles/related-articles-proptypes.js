import PropTypes from "prop-types";
import { relatedArticleItemPropTypes } from "./related-article-item-proptypes";

export const relatedArticlesPropTypes = {
  articles: PropTypes.arrayOf(relatedArticleItemPropTypes.article),
  leadId: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  opinionId: PropTypes.string,
  template: PropTypes.string
};

export const relatedArticlesDefaultProps = {
  leadId: "",
  opinionId: "",
  template: "DEFAULT"
};
