import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexBasis: "100%",
    justifyContent: "center"
  }
});

const ArticleLoading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" />
  </View>
);

export default ArticleLoading;
