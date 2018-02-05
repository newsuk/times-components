import React from "react";
import { StyleSheet, Text } from "react-native";
import { StyledRelatedArticlesHeading } from "./styles/responsive";

const styles = StyleSheet.create({
  title: {
    fontFamily: "TimesModern-Bold",
    fontSize: 26,
    color: "#333"
  }
});

const RelatedArticlesHeading = () => (
  <StyledRelatedArticlesHeading>
    <Text style={styles.title}>Related links</Text>
  </StyledRelatedArticlesHeading>
);

export default RelatedArticlesHeading;
