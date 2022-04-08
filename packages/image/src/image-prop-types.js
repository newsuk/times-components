import PropTypes from "prop-types";

export const propTypes = {
  style: PropTypes.object,
  accessibilityLabel: PropTypes.string,
  aspectRatio: PropTypes.number,
  borderRadius: PropTypes.number,
  disablePlaceholder: PropTypes.bool,
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number,
  lowResQuality: PropTypes.number,
  lowResSize: PropTypes.number,
  onLayout: PropTypes.func,
  rounded: PropTypes.bool,
  uri: PropTypes.string
};

export const defaultProps = {
  aspectRatio: undefined,
  disablePlaceholder: false,
  fadeImageIn: false,
  highResSize: null,
  lowResSize: null,
  rounded: false,
  uri: null
};
