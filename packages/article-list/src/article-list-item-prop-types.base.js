import PropTypes from "prop-types";

export const propTypesBase = {
  article: PropTypes.shape({
    headline: PropTypes.string,
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
  }),
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number
};

export const propTypes = {
  ...propTypesBase,
  imageRatio: PropTypes.number,
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  showImage: PropTypes.bool
};

export const defaultProps = {
  article: null,
  fadeImageIn: false,
  highResSize: null,
  imageRatio: 1,
  showImage: true,
  summary: []
};
