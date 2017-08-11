import React from "react";
import { Text } from "react-native";
import propTypes from "prop-types";
import { styles } from "./link.styles";

export default function Link({ url, style, children }) {
  if (!url || !children) {
    return null;
  }

  return (
    <Text accessibilityRole="link" href={url} style={[styles, style]}>
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
