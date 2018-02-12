import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export const relatedArticleItemPropTypes = {
  article: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string.isRequired,
    label: PropTypes.string,
    publishedTime: PropTypes.string.isRequired,
    summary: PropTypes.arrayOf(treePropType).isRequired,
    url: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
};

export const relatedArticlesPropTypes = {
  articles: PropTypes.arrayOf(relatedArticleItemPropTypes.article),
  onPress: PropTypes.func.isRequired,
  template: PropTypes.string
};

export const defaultProps = {
  template: "DEFAULT"
};
