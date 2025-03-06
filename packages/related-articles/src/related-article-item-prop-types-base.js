/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import { propTypes as treePropType } from "@times-components/markup-forest";

export const sharedPropTypes = {
  article: PropTypes.shape({
    bylines: PropTypes.arrayOf(treePropType),
    hasVideo: PropTypes.bool,
    headline: PropTypes.string,
    label: PropTypes.string,
    publishedTime: PropTypes.string.isRequired,
    shortHeadline: PropTypes.string,
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
    style: PropTypes.object
  }),
  isOpinionByline: PropTypes.bool,
  isReversed: PropTypes.bool,
  showImage: PropTypes.bool,
  showSummary: PropTypes.bool,
  summaryConfig: PropTypes.shape({
    lengths: PropTypes.arrayOf(PropTypes.number),
    style: PropTypes.object,
    type: PropTypes.string
  })
};

export const sharedDefaultProps = {
  article: null,
  hasVideo: false,
  imageConfig: {},
  isOpinionByline: false,
  isReversed: false,
  showImage: true,
  showSummary: true,
  summary105: [],
  summary145: [],
  summary160: [],
  summary175: [],
  summary225: [],
  summaryConfig: {}
};
