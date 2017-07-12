import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";
import props from "./fixtures/article.json";

storiesOf("ArticleSummary", module).add("ArticleSummary", () =>
  <View style={{ width: "100%", padding: 30 }}>
    <ArticleSummary {...props} />
  </View>
);
