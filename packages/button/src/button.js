import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { colours } from "@times-components/styleguide";
import transformTitle from "./utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({ fontSize, lineHeight, onPress, style, title }) => {
  const transformedTitle = transformTitle(title);
  const fontSizeStyle = fontSize ? { fontSize } : null;
  const lineHeightStyle = lineHeight ? { lineHeight } : null;
  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      accessibilityLabel={transformedTitle}
      accessibilityRole="button"
      accessibilityTraits="button"
      activeOpacity={1}
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor={colours.functional.actionPressed}
    >
      <Text
        style={[styles.text, fontSizeStyle, lineHeightStyle]}
        title={transformedTitle}
      >
        {transformedTitle}
      </Text>
    </TouchableHighlight>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
