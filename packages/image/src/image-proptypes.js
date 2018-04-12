import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

export const defaultProps = {
  style: {},
  uri: "",
  aspectRatio: undefined
};

export const propTypes = {
  uri: PropTypes.string,
  aspectRatio: PropTypes.number,
  style: ViewPropTypesStyle
};
