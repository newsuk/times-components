import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { IntlProvider } from "react-intl";
import ArticleSummary from "./article-summary";
import props from "./fixtures/article.json";

const story = m =>
  <IntlProvider locale="en">
    <View style={{ padding: 20 }}>{m}</View>
  </IntlProvider>;

storiesOf("ArticleSummary", module).add("ArticleSummary", () =>
  story(<ArticleSummary {...props} />)
);
