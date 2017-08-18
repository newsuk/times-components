import React from "react";
import { Text } from "react-native";

import { defaultProps, propTypes } from "./link.proptypes";

const styles = {
  color: "#069",
  textDecorationLine: "underline"
};

export default function Link({ url, style, children }) {
  return (
    <Text accessibilityRole="link" href={url} style={[styles, style]}>
      {children}
    </Text>
  );
}

Link.defaultProps = defaultProps;

Link.propTypes = propTypes;
