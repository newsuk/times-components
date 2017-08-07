import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleByline from "./article-byline";

const authorsAST = require("./fixtures/authors.json").fixture;

const bylineStyles = {
  byline: {
    textTransform: "uppercase"
  },
  link: {
    color: "red"
  }
};

storiesOf("ArticleByline", module)
  .add("ArticleByline with a single author", () =>
    <ArticleByline ast={authorsAST.singleAuthor} />
  )
  .add("ArticleByline with multiple authors", () =>
    <ArticleByline ast={authorsAST.multipleAuthors} />
  )
  .add("ArticleByline with styles", () =>
    <ArticleByline ast={authorsAST.multipleAuthors} style={bylineStyles} />
  );
