import PropTypes from "prop-types";

export const propTypes = {
  style: PropTypes.object,
  accessibilityLabel: PropTypes.string,
  aspectRatio: PropTypes.number,
  borderRadius: PropTypes.number,
  disablePlaceholder: PropTypes.bool,
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number,
  onLayout: PropTypes.func,
  rounded: PropTypes.bool,
  uri: PropTypes.string,
  isLcpItem: PropTypes.bool
};

export const defaultProps = {
  aspectRatio: undefined,
  disablePlaceholder: false,
  fadeImageIn: false,
  highResSize: null,
  rounded: false,
  uri: null,
  isLcpItem: false
};
