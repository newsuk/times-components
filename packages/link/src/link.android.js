import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import PropTypes from "prop-types";

const Link = ({ children, onPress }) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    onPress={onPress}
    useForeground={TouchableNativeFeedback.canUseNativeForeground()}
  >
    <View pointerEvents="box-only">{children}</View>
  </TouchableNativeFeedback>
);

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired
};

export default Link;
export { default as TextLink } from "./text-link";
