import PropTypes from "prop-types";

export const propTypes = {
  ast: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAuthorPress: PropTypes.func
};

export const defaultProps = {
  onAuthorPress: () => null
};
