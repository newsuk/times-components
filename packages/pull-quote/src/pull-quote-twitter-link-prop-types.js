import PropTypes from "prop-types";

export const propTypes = {
  onTwitterLinkPress: PropTypes.func.isRequired,
  twitter: PropTypes.string
};

export const defaultProps = {
  twitter: ""
};
