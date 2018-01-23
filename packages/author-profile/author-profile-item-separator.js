import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "@times-components/styleguide"

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours.keylineGrey,
    height: 1
  }
});

const AuthorProfileSeparator = () => <View style={styles.container} />;

export default AuthorProfileSeparator;
