import React from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import StylePropTypes from "react-style-proptype";

const styles = StyleSheet.create({
  textLink: {
    textDecorationLine: "underline"
  }
});

const TextLink = ({ style, url, onPress, children }) => (
  <Text
    style={[styles.textLink].concat(style)}
    href={url}
    onPress={onPress}
    accessibilityRole="link"
  >
    {children}
  </Text>
);

TextLink.propTypes = {
  style: StylePropTypes,
  url: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

TextLink.defaultProps = {
  style: {}
};

export default TextLink;
