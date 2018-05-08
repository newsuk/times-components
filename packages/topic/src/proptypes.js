import PropTypes from "prop-types";

export const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export const defaultProps = {
  description: ""
};
