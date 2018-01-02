import React from "react";
import { View, TouchableNativeFeedback } from "react-native";
import PropTypes from "prop-types";

const Link = ({ onPress, children }) => (
  <TouchableNativeFeedback onPress={onPress} useForeground delayPressIn={0}>
    <View pointerEvents="box-only">{children}</View>
  </TouchableNativeFeedback>
);

Link.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default Link;
export { default as TextLink } from "./text-link";
