import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";
import { propTypes as treePropType } from "@times-components/markup-forest";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const sharedPropTypes = {
  article: PropTypes.shape({
    byline: PropTypes.arrayOf(treePropType),
    headline: PropTypes.string.isRequired,
    shortHeadline: PropTypes.string.isRequired,
    label: PropTypes.string,
    publishedTime: PropTypes.string.isRequired,
    summary105: PropTypes.arrayOf(treePropType),
    summary125: PropTypes.arrayOf(treePropType).isRequired,
    summary145: PropTypes.arrayOf(treePropType),
    summary160: PropTypes.arrayOf(treePropType),
    summary175: PropTypes.arrayOf(treePropType),
    summary225: PropTypes.arrayOf(treePropType),
    url: PropTypes.string
  }),
  imageConfig: PropTypes.shape({
    cropSize: PropTypes.string,
    imageRatio: PropTypes.number,
    style: ViewPropTypesStyle
  }),
  isOpinionByline: PropTypes.bool,
  isReversed: PropTypes.bool,
  showImage: PropTypes.bool,
  showSummary: PropTypes.bool,
  summaryConfig: PropTypes.shape({
    lengths: PropTypes.arrayOf(PropTypes.number),
    style: ViewPropTypesStyle,
    type: PropTypes.string
  })
};

export const sharedDefaultProps = {
  article: null,
  summary105: [],
  summary145: [],
  summary160: [],
  summary175: [],
  summary225: [],
  imageConfig: {},
  isOpinionByline: false,
  isReversed: false,
  showImage: true,
  showSummary: true,
  summaryConfig: {}
};
