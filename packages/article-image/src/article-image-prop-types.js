import PropTypes from "prop-types";

export const propTypes = {
  captionOptions: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string
  }),
  imageOptions: PropTypes.shape({
    display: PropTypes.oneOf(["primary", "secondary", "inline", "fullwidth"]),
    highResSize: PropTypes.number,
    lowResSize: PropTypes.number,
    ratio: PropTypes.string,
    uri: PropTypes.string.isRequired
  }).isRequired,
  onImagePress: PropTypes.func
};

export const defaultPropTypes = {
  captionOptions: {
    caption: null,
    credits: null
  },
  onImagePress: null
};
