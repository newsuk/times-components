import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {},
  label: {
    color: "#333333",
    fontFamily: "GillSansMTStd-Medium",
    fontSize: 12,
    marginBottom: 2,
    letterSpacing: 1
  },
  headline: {
    color: "#333333",
    fontSize: 22,
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: "TimesModern-Bold",
    fontWeight: "400"
  },
  text: {
    color: "#696969",
    fontSize: 14,
    fontFamily: "TimesDigital-Regular",
    lineHeight: 20,
    marginBottom: 10,
    flexWrap: "wrap"
  },
  meta: {
    color: "#696969",
    fontSize: 13,
    fontFamily: "GillSansMTStd-Medium"
  }
});

export default function ArticleSummary({
  label,
  headline,
  text,
  date,
  publication
}) {
  const labelText = typeof label === "string" ? label.toUpperCase() : label;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{labelText}</Text>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.text}>{text}</Text>
      {date && publication
        ? <Text style={styles.meta}>
            {date}, {publication}
          </Text>
        : null}
    </View>
  );
}
