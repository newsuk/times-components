import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dbdbdb",
    height: 1,
    padding: 10
  }
});

const AuthorProfileSeparator = () => <View style={styles.container} />;

export default AuthorProfileSeparator;
