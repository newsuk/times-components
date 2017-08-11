import { View } from "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleByline from "./article-byline";

const authorsAST = require("./fixtures/authors.json").fixture;

const bylineStyles = {
  byline: {
    color: "blue"
  },
  link: {
    color: "red",
    textDecorationLine: "underline"
  }
};

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleByline", module)
  .add("ArticleByline with a single author", () =>
    story(<ArticleByline ast={authorsAST.singleAuthor} />)
  )
  .add("ArticleByline with multiple authors", () =>
    story(<ArticleByline ast={authorsAST.multipleAuthors} />)
  )
  .add("ArticleByline with styles", () =>
    story(
      <ArticleByline ast={authorsAST.multipleAuthors} style={bylineStyles} />
    )
  );
