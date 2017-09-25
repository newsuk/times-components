import PropTypes from "prop-types";

export const articleImagePropTypes = {
  imageOptions: PropTypes.shape({
    display: PropTypes.string.isRequired,
    ratio: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  captionOptions: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string
  })
};

export const articleImageDefaultPropTypes = {
  captionOptions: {
    caption: "",
    credits: ""
  }
};
