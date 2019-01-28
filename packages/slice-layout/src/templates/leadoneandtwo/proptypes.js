import PropTypes from "prop-types";

const propTypes = {
  renderLead: PropTypes.func.isRequired,
  renderSupport1: PropTypes.func.isRequired,
  renderSupport2: PropTypes.func.isRequired,
  withSeparators: PropTypes.bool
};

const defaultProps = {
  withSeparators: false
};

export { propTypes, defaultProps };
