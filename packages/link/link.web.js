import React from "react";
import pick from "lodash.pick";
import { Text } from "react-native";

import { defaultProps, propTypes } from "./link.proptypes";

const styles = {
  color: "#069",
  textDecorationLine: "underline"
};

const Link = props => {
  const { children, onPress = () => {}, style, url } = props;

  return (
    <Text
      {...pick(props, Object.keys(Text.propTypes))}
      accessibilityRole="link"
      href={url}
      onPress={onPress}
      style={[styles, style]}
    >
      {children}
    </Text>
  );
};

Link.defaultProps = defaultProps;

Link.propTypes = propTypes;

export default Link;
