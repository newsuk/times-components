import React from "react";
import { TouchableOpacity } from "react-native";
import propTypes from "./link.proptypes";

const Link = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

Link.propTypes = propTypes;

export default Link;
export { default as TextLink } from "./text-link";
