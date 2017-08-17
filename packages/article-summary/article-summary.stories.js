import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import ArticleSummary from "./article-summary";
import props from "./fixtures/article.json";

props.date = new Date(props.date);

const story = m =>
  <View style={{ padding: 20 }}>
    {m}
  </View>;

storiesOf("ArticleSummary", module).add("ArticleSummary", () =>
  story(<ArticleSummary {...props} />)
);
