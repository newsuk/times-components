import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const Link = ({ onPress, children }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;
export { default as TextLink } from "./text-link";
