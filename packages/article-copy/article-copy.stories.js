import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleCopy from "./article-copy";

const multiParagraph = require("./fixtures/multi-paragraph.json").fixture;

storiesOf("ArticleCopy", module).add("ArticleCopy", () =>
  <ArticleCopy content={multiParagraph} />
);
