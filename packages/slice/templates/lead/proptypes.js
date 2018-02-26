import PropTypes from "prop-types";

export const propTypes = {
  lead: PropTypes.node.isRequired,
  support1: PropTypes.node,
  support2: PropTypes.node
};

export const defaultProps = {
  support1: null,
  support2: null
};
