import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cleanUpTitle from "../utils";
import {
  colours,
  fonts,
  fontSizes
} from "@times-components/styleguide";

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    height: 36,
    justifyContent: 'center',
    width: "100%"
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: colours.functional.action,
    borderRadius: 4,
    elevation: 5,
    height: 36,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 1.0,
    shadowRadius: 5
  },
  textStyle: {
    color: '#FFFFFF'
  }
});

const ButtonPrimary = ({ onPress, style, title }) => {
  const cleanTitle = cleanUpTitle(title);
  return (
    <TouchableOpacity accessible accessibilityLabel={cleanTitle} onPress={onPress} style={styles.button}>
      <View style={[styles.buttonContainer, style]}>
          <Text style={styles.textStyle}>{cleanTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
