import PropTypes from "prop-types";

export const propTypesBase = {
  headline: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  imageSize: PropTypes.number,
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
  shortSummary: PropTypes.array,
  summary: PropTypes.array,
  url: PropTypes.string
};

export const propTypes = {
  ...propTypesBase,
  imageRatio: PropTypes.number,
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  showImage: PropTypes.bool
};

export const defaultProps = {
  headline: "",
  imageRatio: 1,
  imageSize: null,
  label: "",
  longSummary: [],
  onPress: () => {},
  publicationName: "",
  publishedTime: "",
  shortSummary: [],
  showImage: true,
  summary: [],
  url: ""
};
