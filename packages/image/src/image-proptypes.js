import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const defaultProps = {
  aspectRatio: undefined,
  style: {},
  uri: ""
};

export const propTypes = {
  aspectRatio: PropTypes.number,
  style: ViewPropTypesStyle,
  uri: PropTypes.string
};
