import React from "react";
import { View, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";

const Link = ({ onPress, children }) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    onPress={onPress}
    useForeground={TouchableNativeFeedback.canUseNativeForeground()}
  >
    <View pointerEvents="box-only">{children}</View>
  </TouchableNativeFeedback>
);

Link.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;
export { default as TextLink } from "./text-link";
