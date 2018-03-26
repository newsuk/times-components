import PropTypes from "prop-types";

export const propTypes = {
  opinion: PropTypes.func.isRequired,
  renderSupports: PropTypes.func
};

export const defaultProps = {
  renderSupports: () => []
};
