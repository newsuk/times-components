import React from "react";
import { StyleSheet, View } from "react-native";
import { colours } from "@times-components/styleguide";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.functional.keyline,
    height: 1
  }
});

const AuthorProfileSeparator = () => <View style={styles.container} />;

export default AuthorProfileSeparator;
