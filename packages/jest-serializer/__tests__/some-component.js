import React from "react";
import { Text, View, ViewPropTypes } from "react-native";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const SomeComponent = ({ style, children }) => (
  <View style={style}>
    {children}
    <Text>deeply nested</Text>
  </View>
);

SomeComponent.propTypes = {
  style: ViewPropTypesStyle
};

SomeComponent.defaultProps = {
  style: null
};

export default SomeComponent;
