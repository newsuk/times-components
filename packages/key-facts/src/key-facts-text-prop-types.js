import PropTypes from "prop-types";

export const propTypes = {
  item: PropTypes.object.isRequired,
  listIndex: PropTypes.number.isRequired,
  onLinkPress: PropTypes.func
};

export const defaultProps = {
  onLinkPress: () => {}
};
