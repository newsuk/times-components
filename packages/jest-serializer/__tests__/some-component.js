import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const SomeComponent = ({ style, children }) => (
  <View style={style}>
    {children}
    <Text>deeply nested</Text>
  </View>
);

SomeComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.shape({})
};

SomeComponent.defaultProps = {
  style: null
};

export default SomeComponent;
