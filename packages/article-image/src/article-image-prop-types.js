import PropTypes from "prop-types";

export const propTypes = {
  captionOptions: PropTypes.shape({
    caption: PropTypes.string,
    credits: PropTypes.string
  }),
  imageOptions: PropTypes.shape({
    display: PropTypes.oneOf(["primary", "secondary", "inline"]),
    ratio: PropTypes.string,
    url: PropTypes.string.isRequired
  }).isRequired
};

export const defaultPropTypes = {
  captionOptions: {
    caption: null,
    credits: null
  }
};
