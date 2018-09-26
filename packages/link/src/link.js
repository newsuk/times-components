import React from "react";
import { TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const Link = ({ children, delayPressIn, linkStyle, onPress }) => (
  <TouchableOpacity
    delayPressIn={delayPressIn}
    onPress={onPress}
    style={linkStyle}
  >
    {children}
  </TouchableOpacity>
);

const { style: ViewPropTypesStyle } = ViewPropTypes;

Link.propTypes = {
  children: PropTypes.node.isRequired,
  delayPressIn: PropTypes.number,
  linkStyle: ViewPropTypesStyle,
  onPress: PropTypes.func.isRequired
};

Link.defaultProps = {
  delayPressIn: 0,
  linkStyle: {}
};

export default Link;
export { default as TextLink } from "./text-link";
