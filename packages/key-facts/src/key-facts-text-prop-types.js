import PropTypes from "prop-types";

export const propTypes = {
  item: PropTypes.object.isRequired,
  listIndex: PropTypes.number.isRequired,
  scale: PropTypes.string,
  onLinkPress: PropTypes.func
};

export const defaultProps = {
  scale: "medium",
  onLinkPress: () => {}
};
