import PropTypes from "prop-types";
import { Image } from "react-native";

export const propTypes = {
  ...Image.PropTypes,
  aspectRatio: PropTypes.number,
  borderRadius: PropTypes.number,
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number,
  lowResSize: PropTypes.number,
  onLayout: PropTypes.func,
  uri: PropTypes.string
};

export const defaultProps = {
  ...Image.defaultImagePropTypes,
  aspectRatio: undefined,
  fadeImageIn: false,
  highResSize: null,
  lowResSize: null,
  uri: null
};
