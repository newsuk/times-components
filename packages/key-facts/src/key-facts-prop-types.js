import PropTypes from "prop-types";

export const propTypes = {
  items: PropTypes.array.isRequired,
  onLinkPress: PropTypes.func,
  title: PropTypes.string
};

export const defaultProps = {
  onLinkPress: () => {},
  title: ""
};
