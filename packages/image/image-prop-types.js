import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const defaultProps = {
  style: {},
  uri: ""
};

export const propTypes = {
  uri: PropTypes.string,
  aspectRatio: PropTypes.number.isRequired,
  style: ViewPropTypesStyle
};
