import React from "react";
import { Text, Linking } from "react-native";

import { defaultProps, propTypes } from "./link.proptypes";

const styles = {
  color: "#069",
  textDecorationLine: "underline"
};

export default function Link({ url, style, children }) {
  return (
    <Text onPress={() => Linking.openURL(url)} style={[styles, style]}>
      {children}
    </Text>
  );
}

Link.defaultProps = defaultProps;

Link.propTypes = propTypes;
