import React from "react";
import { StyleSheet, View, Text } from "react-native";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

const RelatedArticlesHeading = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>Related links</Text>
  </View>
);

export default RelatedArticlesHeading;
