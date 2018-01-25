import React from "react";
import { StyleSheet, Text } from "react-native";
import SharedStyles from "./styles/shared";

const styles = StyleSheet.create(SharedStyles);

const RelatedArticlesHeading = () => (
  <Text style={styles.title}>Related links</Text>
);

export default RelatedArticlesHeading;
