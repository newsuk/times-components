import { View, StyleSheet } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";

const style = StyleSheet.create({
  headline: {
    color: "red"
  }
});

const props = {
  label: "Camilla Long",
  headline: "OK, so Putin’s not a lady, but he does have the wildest man‑PMT",
  date: "Sunday June 11 2017",
  publication: "The Sunday Times",
  text:
    "When I was the official celebrity sex correspondent on Style magazine, every so often I would have to address the abject failure of male...  "
};

storiesOf("ArticleSummary", module).add("ArticleSummary", () =>
  <View style={{ width: 395 }}>
    <ArticleSummary {...props} />
  </View>
)
.add("ArticleSummary with changed styles", () => {
  return (
    <View style={{ width: 395 }}>
      <ArticleSummary {...{...props, style}} />
    </View>
  );
});
