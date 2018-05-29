import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  onPress: PropTypes.func,
  style: ViewPropTypesStyle,
  title: PropTypes.string
};

export const defaultProps = {
  onPress: () => null,
  style: null,
  title: ""
};
