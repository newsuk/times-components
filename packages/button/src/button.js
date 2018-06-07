import React from "react";
import { Text, TouchableOpacity } from "react-native";
import transformTitle from "./utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({ onPress, style, title }) => {
  const transformedTitle = transformTitle(title);
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      accessibilityLabel={transformedTitle}
      accessibilityRole="button"
      accessibilityTraits="button"
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={styles.textStyle} title={transformedTitle}>
        {transformedTitle}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
