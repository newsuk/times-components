import PropTypes from "prop-types";

export const articleImagePropTypes = {
  imageOptions: PropTypes.shape({
    id: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    ratio: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired,
  captionOptions: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string
  })
};

export const articleImageDefaultPropTypes = {
  captionOptions: {
    caption: "",
    credit: ""
  }
};
