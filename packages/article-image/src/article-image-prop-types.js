import PropTypes from "prop-types";

export const articleImagePropTypes = {
  imageOptions: PropTypes.shape({
    display: PropTypes.oneOf(["primary", "secondary", "inline"]),
    ratio: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired,
  captionOptions: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string
  })
};

export const articleImageDefaultPropTypes = {
  captionOptions: {
    caption: null,
    credits: null
  }
};
