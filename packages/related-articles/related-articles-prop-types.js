import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export const propTypes = {
  item: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string,
    label: PropTypes.string,
    onPress: PropTypes.func,
    publicationName: PropTypes.string,
    publishedTime: PropTypes.string,
    summary: PropTypes.arrayOf(treePropType),
    url: PropTypes.string
  }).isRequired,
  template: PropTypes.string
};

export const defaultProps = {
  template: "DEFAULT"
};
