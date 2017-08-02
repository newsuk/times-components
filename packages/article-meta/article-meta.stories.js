import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import ArticleMeta from "./article-meta";

const props = {
  date: "2017-07-01T14:32:00.000Z",
  publication: "The Sunday Times"
};

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleMeta", module).add("ArticleMeta", () =>
  story(<ArticleMeta {...props} />)
);
