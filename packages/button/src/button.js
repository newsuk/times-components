import React from "react";
import { Text, TouchableHighlight } from "react-native";
import { colours } from "@times-components/styleguide";
import transformTitle from "./utils";
import { propTypes, defaultProps } from "./button-prop-types";
import styles from "./styles";

const Button = ({ onPress, style, title }) => {
  const transformedTitle = transformTitle(title);

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
      <Text style={styles.text} title={transformedTitle}>
        {transformedTitle}
      </Text>
    </TouchableHighlight>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
