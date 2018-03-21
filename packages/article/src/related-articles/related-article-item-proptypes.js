import PropTypes from "prop-types";
import { treePropType } from "@times-components/markup";

export const relatedArticleItemPropTypes = {
  article: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string.isRequired,
    label: PropTypes.string,
    publishedTime: PropTypes.string.isRequired,
    summary105: PropTypes.arrayOf(treePropType).isRequired,
    summary125: PropTypes.arrayOf(treePropType).isRequired,
    summary145: PropTypes.arrayOf(treePropType).isRequired,
    summary160: PropTypes.arrayOf(treePropType).isRequired,
    summary175: PropTypes.arrayOf(treePropType).isRequired,
    summary225: PropTypes.arrayOf(treePropType).isRequired,
    url: PropTypes.string
  }).isRequired,
  contentContainerClass: PropTypes.string,
  headlineClass: PropTypes.string,
  imageContainerClass: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  showImage: PropTypes.bool,
  showSummary: PropTypes.bool,
  summaryClass: PropTypes.string
};

export const relatedArticleItemDefaultProps = {
  contentContainerClass: "",
  headlineClass: "",
  imageContainerClass: "",
  showImage: true,
  showSummary: true,
  summaryClass: ""
};
