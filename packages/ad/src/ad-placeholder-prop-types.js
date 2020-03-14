import PropTypes from "prop-types";

export const propTypes = {
  height: PropTypes.number.isRequired,
  style: PropTypes.shape({}).isRequired,
  width: PropTypes.number.isRequired
};

export const defaultProps = {
  style: null
};
