import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  aspectRatio: PropTypes.number,
  borderRadius: PropTypes.number,
  fadeImageIn: PropTypes.bool,
  highResSize: PropTypes.number,
  lowResSize: PropTypes.number,
  onLayout: PropTypes.func,
  style: ViewPropTypesStyle,
  uri: PropTypes.string
};

export const defaultProps = {
  aspectRatio: undefined,
  borderRadius: undefined,
  fadeImageIn: false,
  highResSize: null,
  lowResSize: null,
  style: {},
  uri: null
};
