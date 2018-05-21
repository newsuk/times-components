import PropTypes from "prop-types";

export const propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool
};

export const defaultProps = {
  name: "",
  description: "",
  isLoading: true
};
