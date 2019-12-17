import PropTypes from "prop-types";

export const propTypes = {
  ast: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onAuthorPress: PropTypes.func,
  capitalize: PropTypes.bool,
  children: PropTypes.array,
  key: PropTypes.string,
  attributes: PropTypes.array,
  slug: PropTypes.string
};

export const defaultProps = {
  onAuthorPress: () => null,
  capitalize: false
};
