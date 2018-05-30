import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import cleanUpTitle from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textStyle: {
    color: '#FFFFFF'
  },
  buttonContainer: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  }
});

const ButtonPrimary = ({ onPress, style, title }) => {
  const cleanTitle = cleanUpTitle(title);
  return (
    <View style={styles.container}>
      <View elevation={5} style={styles.buttonContainer}>
        <TouchableOpacity accessible accessibilityLabel={cleanTitle} onPress={onPress}>
          <Text style={styles.textStyle}>{cleanTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ButtonPrimary;
