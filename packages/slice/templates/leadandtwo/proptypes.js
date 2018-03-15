import PropTypes from "prop-types";

export const propTypes = {
  lead: PropTypes.func.isRequired,
  support1: PropTypes.func,
  support2: PropTypes.func
};

export const defaultProps = {
  support1: () => null,
  support2: () => null
};
