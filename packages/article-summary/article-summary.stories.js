import "intl";
import "react-intl/locale-data/en";

import React from "react";
import { Text, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { IntlProvider } from "react-intl";
import ArticleSummary from "./article-summary";
import props from "./fixtures/article.json";

const story = m =>
  <IntlProvider textComponent={Text} locale="en">
    <View style={{ padding: 20 }}>{m}</View>
  </IntlProvider>;

storiesOf("ArticleSummary", module).add("ArticleSummary", () =>
  story(<ArticleSummary {...props} />)
);
