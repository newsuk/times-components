import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleMeta from "./article-meta";

const props = {
  date: "2017-07-01T14:32:00.000Z",
  publication: "The Sunday Times"
};

storiesOf("ArticleMeta", module).add("ArticleMeta", () =>
  <ArticleMeta {...props} />
);
