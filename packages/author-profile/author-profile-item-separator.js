import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dbdbdb",
    height: 1,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  }
});

const AuthorProfileSeparator = () => <View style={styles.container} />;

export default AuthorProfileSeparator;
