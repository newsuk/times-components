import React from "react";
import { TouchableNativeFeedback, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const Link = ({ children, linkStyle, onPress }) => (
  <TouchableNativeFeedback
    delayPressIn={0}
    onPress={onPress}
    useForeground={TouchableNativeFeedback.canUseNativeForeground()}
  >
    <View pointerEvents="box-only" style={linkStyle}>
      {children}
    </View>
  </TouchableNativeFeedback>
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
