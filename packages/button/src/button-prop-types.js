import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypesStyle,
  title: PropTypes.string
};

export const defaultProps = {
  fontSize: null,
  lineHeight: null,
  style: null,
  title: "Submit"
};
