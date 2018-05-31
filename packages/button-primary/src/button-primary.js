import React from "react";
import { Text, TouchableOpacity } from "react-native";
import cleanUpTitle from "../utils";
import { propTypes, defaultProps } from "./button-primary-prop-types";
import styles from "./styles";

const ButtonPrimary = ({ onPress, style, title }) => {
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

ButtonPrimary.propTypes = propTypes;
ButtonPrimary.defaultProps = defaultProps;

export default ButtonPrimary;
