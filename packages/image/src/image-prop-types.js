import PropTypes from "prop-types";
import { Image } from "react-native";

export const propTypes = {
  ...Image.PropTypes,
  accessibilityLabel: PropTypes.string,
  aspectRatio: PropTypes.number,
  borderRadius: PropTypes.number,
  disablePlaceholder: PropTypes.bool,
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number,
  lowResSize: PropTypes.number,
  onLayout: PropTypes.func,
  rounded: PropTypes.bool,
  uri: PropTypes.string
};

export const defaultProps = {
  ...Image.defaultImagePropTypes,
  aspectRatio: undefined,
  disablePlaceholder: false,
  fadeImageIn: false,
  highResSize: null,
  lowResSize: null,
  rounded: false,
  uri: null
};
