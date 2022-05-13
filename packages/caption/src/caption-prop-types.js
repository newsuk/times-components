import { ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const propTypes = {
  children: PropTypes.element,
  credits: PropTypes.string,
  style: PropTypes.shape({
    container: ViewPropTypesStyle,
    text: PropTypes.string
  }),
  text: PropTypes.string
};

export const defaultProps = {
  children: null,
  credits: "",
  style: {},
  text: ""
};
