import PropTypes from "prop-types";

export const propTypes = {
  headline: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  imageRatio: PropTypes.number,
  imageSize: PropTypes.number,
  label: PropTypes.string,
  leadAsset: PropTypes.shape({
    crop: PropTypes.shape({
      url: PropTypes.string
    }),
    title: PropTypes.string
  }),
  longSummary: PropTypes.array,
  onPress: PropTypes.func,
  publicationName: PropTypes.string,
  publishedTime: PropTypes.string,
  shortSummary: PropTypes.array,
  showImage: PropTypes.bool,
  summary: PropTypes.array,
  url: PropTypes.string
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
