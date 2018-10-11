import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  degrees: PropTypes.number,
  style: ViewPropTypesStyle
};

export const defaultProps = {
  children: null,
  degrees: 265,
  style: null
};
