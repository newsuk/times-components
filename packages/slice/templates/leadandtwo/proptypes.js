import PropTypes from "prop-types";

export const propTypes = {
  lead: PropTypes.func.isRequired,
  renderSupports: PropTypes.func
};

export const defaultProps = {
  renderSupports: () => []
};
