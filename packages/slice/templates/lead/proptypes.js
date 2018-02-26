import PropTypes from "prop-types";

export const propTypes = {
  lead: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.node)
};

export const defaultProps = {
  sections: []
};
