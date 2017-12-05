import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleByline from "./article-byline";

const authorsAST = require("./fixtures/authors.json");

const bylineStyles = {
  link: {
    color: "red",
    textDecorationLine: "none"
  }
};

storiesOf("ArticleByline", module)
  .add("ArticleByline with a single author", () => (
    <ArticleByline ast={authorsAST.singleAuthor} />
  ))
  .add("ArticleByline with a text only element", () => (
    <ArticleByline ast={authorsAST.singleInlineElement} />
  ))
  .add("ArticleByline with multiple authors", () => (
    <ArticleByline ast={authorsAST.multipleAuthorsCommaSeparated} />
  ))
  .add("ArticleByline with author in the beginning", () => (
    <ArticleByline ast={authorsAST.authorInTheBeginning} />
  ))
  .add("ArticleByline with author at the end", () => (
    <ArticleByline ast={authorsAST.authorAtTheEnd} />
  ))
  .add("ArticleByline with styles", () => (
    <ArticleByline
      ast={authorsAST.multipleAuthorsCommaSeparated}
      style={bylineStyles}
    />
  ));
