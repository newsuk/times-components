import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexBasis: "100%",
    justifyContent: "center"
  }
});

export default () => <Text style={styles.container}>Loading ...</Text>;
