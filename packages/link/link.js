import React from "react";
import { Text, Linking } from "react-native";

import { defaultProps, propTypes } from "./link.proptypes";

const styles = {
  color: "#069",
  textDecorationLine: "underline"
};

export default function Link(props) {
  const { children, style, url } = props;

  const { onPress = () => Linking.openURL(url) } = props;

  return (
    <Text {...props} onPress={onPress} style={[styles, style]}>
      {children}
    </Text>
  );
}

Link.defaultProps = defaultProps;

Link.propTypes = propTypes;
