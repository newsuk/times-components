import PropTypes from "prop-types";

const metaPropTypes = {
  bylines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  publicationName: PropTypes.string.isRequired,
  publishedTime: PropTypes.string.isRequired
};

export default metaPropTypes;
