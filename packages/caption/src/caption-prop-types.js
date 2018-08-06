import { Text, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: TextPropTypesStyle } = Text.propTypes;
const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    text: TextPropTypesStyle,
    container: ViewPropTypesStyle
  }),
  text: PropTypes.string
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: ""
};
