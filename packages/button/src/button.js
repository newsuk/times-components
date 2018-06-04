import React from "react";
import { Text, TouchableOpacity } from "react-native";
import cleanUpTitle from "../utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({ onPress, style, title }) => {
  const cleanTitle = cleanUpTitle(title);
  return (
    <TouchableOpacity
      accessibilityComponentType="button"
      accessibilityLabel={cleanTitle}
      accessibilityRole="button"
      accessibilityTraits="button"
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={styles.textStyle} title={cleanTitle}>
        {cleanTitle}
      </Text>
    </TouchableOpacity>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
