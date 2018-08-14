import PropTypes from "prop-types";

export const propTypes = {
  item: PropTypes.object.isRequired,
  listIndex: PropTypes.number.isRequired,
  onLinkPress: PropTypes.func,
  fontStyle: PropTypes.object.isRequired
};

export const defaultProps = {
  onLinkPress: () => {}
};
