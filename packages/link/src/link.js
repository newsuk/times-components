import React from "react";
import { TouchableOpacity, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const Link = ({ children, linkStyle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={linkStyle}>
    {children}
  </TouchableOpacity>
);

const { style: ViewPropTypesStyle } = ViewPropTypes;

Link.propTypes = {
  children: PropTypes.node.isRequired,
  linkStyle: ViewPropTypesStyle,
  onPress: PropTypes.func.isRequired
};

Link.defaultProps = {
  linkStyle: {}
};

export default Link;
export { default as TextLink } from "./text-link";
