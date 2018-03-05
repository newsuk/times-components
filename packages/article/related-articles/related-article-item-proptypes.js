import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export default {
  article: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string.isRequired,
    label: PropTypes.string,
    publishedTime: PropTypes.string.isRequired,
    summary: PropTypes.arrayOf(treePropType).isRequired,
    url: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  showSummaryContent: PropTypes.bool.isRequired
};
