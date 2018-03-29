import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";
import { treePropType } from "@times-components/markup";

const { style: ViewPropTypesStyle } = ViewPropTypes;

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
  bylineClass: PropTypes.string,
  contentContainerClass: PropTypes.string,
  headlineClass: PropTypes.string,
  imageConfig: PropTypes.shape({
    cropSize: PropTypes.string,
    imageRatio: PropTypes.number,
    style: ViewPropTypesStyle
  }),
  imageContainerClass: PropTypes.string,
  isOpinionByline: PropTypes.bool,
  isReversed: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  showImage: PropTypes.bool,
  showSummary: PropTypes.bool,
  summaryConfig: PropTypes.shape({
    lengths: PropTypes.arrayOf(PropTypes.number),
    style: ViewPropTypesStyle,
    type: PropTypes.string
  })
};

export const relatedArticleItemDefaultProps = {
  bylineClass: "",
  contentContainerClass: "",
  headlineClass: "",
  imageConfig: {},
  imageContainerClass: "",
  isOpinionByline: false,
  isReversed: false,
  showImage: true,
  showSummary: true,
  summaryConfig: {}
};
