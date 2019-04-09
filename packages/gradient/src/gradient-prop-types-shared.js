import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  degrees: PropTypes.number,
  endColour: PropTypes.string,
  endPoint: PropTypes.string,
  startColour: PropTypes.string,
  startPoint: PropTypes.string,
  style: ViewPropTypesStyle
};

export const defaultProps = {
  children: null,
  degrees: 265,
  endPoint: "1",
  startPoint: "0",
  style: null
};
