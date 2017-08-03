import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleCopy from "./article-copy";

const multiParagraph = require("./fixtures/multi-paragraph.json").fixture;
const differentTypes = require("./fixtures/different-types.json").fixture;

storiesOf("ArticleCopy", module)
  .add("ArticleCopy with multiple paragraphs", () =>
    <ArticleCopy content={multiParagraph} />
  )
  .add("ArticleCopy with different types (image, pull-quote, key-facts, paragraph)", () =>
    <ArticleCopy content={differentTypes} />
  );
