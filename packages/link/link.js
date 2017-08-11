import React from "react";
import { Text, Linking } from "react-native";
import propTypes from "prop-types";
import { styles } from "./link.styles";

export default function Link({ url, style, children }) {
  if (!url || !children) {
    return null;
  }

  return (
    <Text onPress={() => Linking.openURL(url)} style={[styles, style]}>
      {children}
    </Text>
  );
}

Link.propTypes = {
  style: Text.propTypes.style,
  url: propTypes.string.isRequired,
  children: propTypes.oneOfType([propTypes.string, propTypes.element])
    .isRequired
};

Link.defaultProps = {
  style: {}
};
