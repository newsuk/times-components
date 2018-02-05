import React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  titleContainer: {
    borderStyle: "solid",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#dbdbdb",
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 57,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "TimesModern-Bold",
    fontSize: 26,
    color: "#333"
  },
  cardContainer: {
    paddingBottom: 10,
    paddingTop: 10
  },
  headline: {
    color: "#333333",
    marginBottom: 5,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  }
});

const RelatedArticlesHeading = () => (
  <View style={styles.titleContainer}>
    <Text style={styles.title}>Related links</Text>
  </View>
);

export default RelatedArticlesHeading;
