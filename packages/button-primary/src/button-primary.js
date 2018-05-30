import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import cleanUpTitle from "../utils";
import { propTypes, defaultProps } from "./button-primary-prop-types";
import styles from "./styles";

const ButtonPrimary = ({ onPress, style, title }) => {
  const cleanTitle = cleanUpTitle(title);
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel={cleanTitle}
      onPress={onPress}
      style={styles.button}
    >
      <View style={[styles.buttonContainer, style]}>
        <Text style={styles.textStyle}>{cleanTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

ButtonPrimary.propTypes = propTypes;
ButtonPrimary.defaultProps = defaultProps;

export default ButtonPrimary;
