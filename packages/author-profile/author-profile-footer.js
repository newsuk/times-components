import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1f24",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 200,
    paddingLeft: 10,
    paddingRight: 10
  }
});

const AuthorProfileFooter = () => <View style={styles.container} />;
export default AuthorProfileFooter;
