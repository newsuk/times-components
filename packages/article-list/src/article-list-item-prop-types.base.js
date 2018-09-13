import PropTypes from "prop-types";

export const propTypesBase = {
  fadeImageIn: PropTypes.bool,
  headline: PropTypes.string,
  highResSize: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string,
  leadAsset: PropTypes.shape({
    crop: PropTypes.shape({
      url: PropTypes.string
    }),
    title: PropTypes.string
  }),
  longSummary: PropTypes.array,
  publicationName: PropTypes.string,
  publishedTime: PropTypes.string,
  shortHeadline: PropTypes.string,
  shortSummary: PropTypes.array,
  summary: PropTypes.array,
  url: PropTypes.string
};

export const propTypes = {
  ...propTypesBase,
  imageRatio: PropTypes.number,
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  showImage: PropTypes.bool
};

export const defaultProps = {
  fadeImageIn: false,
  headline: "",
  highResSize: null,
  imageRatio: 1,
  label: "",
  longSummary: [],
  publicationName: "",
  publishedTime: "",
  shortHeadline: "",
  shortSummary: [],
  showImage: true,
  summary: [],
  url: null
};
