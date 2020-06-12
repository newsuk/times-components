import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { colours } from "@times-components/styleguide";
import { capitalise } from "@times-components/utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({
  fontSize,
  lineHeight,
  onPress,
  style,
  title,
  textStyle,
  underlayColor
}) => {
  const transformedTitle = capitalise(title);
  const fontSizeStyle = fontSize ? { fontSize } : null;
  const lineHeightStyle = lineHeight ? { lineHeight } : null;
  const underlayColorStyle = underlayColor || colours.functional.actionPressed;
  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      accessibilityLabel={transformedTitle}
      accessibilityRole="button"
      accessibilityTraits="button"
      activeOpacity={1}
      onPress={onPress}
      style={[styles.button, style]}
      underlayColor={underlayColorStyle}
    >
      <Text
        style={[styles.text, fontSizeStyle, lineHeightStyle, textStyle]}
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
