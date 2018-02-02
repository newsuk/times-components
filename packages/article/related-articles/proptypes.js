import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export const propTypesItem = {
  article: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string,
    label: PropTypes.string,
    publicationName: PropTypes.string,
    publishedTime: PropTypes.string,
    summary: PropTypes.arrayOf(treePropType),
    url: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
};

export const propTypes = {
  articles: PropTypes.arrayOf(propTypesItem.article),
  onPress: PropTypes.func.isRequired,
  template: PropTypes.string
};

export const defaultProps = {
  template: "DEFAULT"
};
