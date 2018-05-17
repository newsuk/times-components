import PropTypes from "prop-types";

export const propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  isLoading: PropTypes.bool
};

export const defaultProps = {
  description: "",
  isLoading: false
};
