import React from "react";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const Link = ({ children, onPress }) => (
  <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Link;
export { default as TextLink } from "./text-link";
