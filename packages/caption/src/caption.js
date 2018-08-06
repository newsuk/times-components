import React from "react";
import { Text, View } from "react-native";
import { defaultProps, propTypes } from "./caption-prop-types";
import styles from "./styles";

const renderCredits = (style, credits) => {
  if (!credits || credits === "") {
    return null;
  }
  return (
    <Text style={[styles.text, styles.credits, style.text]}>
      {credits.toUpperCase()}
    </Text>
  );
};

const renderText = (style, text) => {
  if (!text || text === "") {
    return null;
  }

  return <Text style={[styles.text, style.text]}>{text}</Text>;
};

const Caption = ({ children, credits, style, text }) => (
  <View>
    {children}
    <View style={[styles.container, style.container]}>
      {renderText(style, text)}
      {renderCredits(style, credits)}
    </View>
  </View>
);

Caption.propTypes = propTypes;
Caption.defaultProps = defaultProps;

export default Caption;
