import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleByline from "./article-byline";

const author = { name: "This Person", location: "This Place" };
const authors = [
  { ...author },
  { name: "That Person", location: "That Place" }
];
storiesOf("ArticleByline", module)
  .add("ArticleByline with a single author", () =>
    <ArticleByline author={author} />
  )
  .add("ArticleByline with multiple authors", () =>
    <ArticleByline author={authors} />
  )
  .add("ArticleByline with styles", () =>
    <ArticleByline author={author} style={{ textTransform: "uppercase" }} />
  );
