import React from "react";
import { Text, StyleSheet } from "react-native";
import { propTypes, defaultProps } from "./text-link-prop-types";

const styles = StyleSheet.create({
  textLink: {
    textDecorationLine: "underline"
  }
});

const TextLink = ({ style, url, onPress, children, target }) => {
  const props = {
    style: [styles.textLink].concat(style),
    href: url,
    onPress,
    accessibilityRole: "link"
  };

  return target ? (
    <Text {...props} target={target}>
      {children}
    </Text>
  ) : (
    <Text {...props}>{children}</Text>
  );
};

TextLink.propTypes = propTypes;
TextLink.defaultProps = defaultProps;

export default TextLink;
