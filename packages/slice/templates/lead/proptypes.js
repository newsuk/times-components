import PropTypes from "prop-types";

export const propTypes = {
  lead: PropTypes.func.isRequired,
  child1: PropTypes.func,
  child2: PropTypes.func
};

export const defaultProps = {
  child1: () => null,
  child2: () => null
};
