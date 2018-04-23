import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  aspectRatio: PropTypes.number,
  style: ViewPropTypesStyle,
  uri: PropTypes.string
};

export const defaultProps = {
  aspectRatio: undefined,
  style: {},
  uri: ""
};
