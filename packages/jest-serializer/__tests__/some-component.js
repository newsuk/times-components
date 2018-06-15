import React from "react";
import { Text, View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";

const { style: ViewPropTypesStyle } = ViewPropTypes;

const SomeComponent = ({ style, children }) => (
  <View style={style}>
    {children}
    <Text>deeply nested</Text>
  </View>
);

SomeComponent.propTypes = {
  style: ViewPropTypesStyle,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

SomeComponent.defaultProps = {
  style: null
};

export default SomeComponent;
