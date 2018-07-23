import PropTypes from "prop-types";

export const propTypes = {
  ast: PropTypes.object.isRequired,
  onLinkPress: PropTypes.func
};

export const defaultProps = {
  onLinkPress: () => {}
};
