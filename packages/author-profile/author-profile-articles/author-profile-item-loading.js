import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: 128,
    justifyContent: "center",
    padding: 4
  }
});

const AuthorProfileLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator type="large" />
  </View>
);

export default AuthorProfileLoading;
