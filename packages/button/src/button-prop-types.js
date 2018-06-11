import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypesStyle,
  title: PropTypes.string
};

export const defaultProps = {
  style: null,
  title: "Submit"
};
