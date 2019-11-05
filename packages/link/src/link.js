import React from "react";
import { TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const Link = ({ children, disabled, linkStyle, onPress }) => (
  <TouchableOpacity
    delayPressIn={100}
    disabled={disabled}
    onPress={onPress}
    style={linkStyle}
  >
    {children}
  </TouchableOpacity>
);

const { style: ViewPropTypesStyle } = ViewPropTypes;

Link.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  linkStyle: ViewPropTypesStyle,
  onPress: PropTypes.func.isRequired
};

Link.defaultProps = {
  disabled: false,
  linkStyle: {}
};

export default Link;
export { default as TextLink } from "./text-link";
