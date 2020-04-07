import PropTypes from "prop-types";

export const propTypes = {
  height: PropTypes.number.isRequired,
  style: PropTypes.shape({}).style,
  width: PropTypes.number.isRequired
};

export const defaultProps = {
  style: null
};
