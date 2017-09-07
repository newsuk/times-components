import { View } from "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleByline from "./article-byline";

const authorsAST = require("./fixtures/authors.json");

const bylineStyles = {
  byline: {
    color: "blue"
  },
  link: {
    color: "red",
    textDecorationLine: "none"
  }
};

const story = m => <View style={{ padding: 20 }}>{m}</View>;

storiesOf("ArticleByline", module)
  .add("ArticleByline with a single author", () =>
    story(<ArticleByline ast={authorsAST.singleAuthor} />)
  )
  .add("ArticleByline with a text only element", () =>
    story(<ArticleByline ast={authorsAST.singleInlineElement} />)
  )
  .add("ArticleByline with multiple authors", () =>
    story(<ArticleByline ast={authorsAST.multipleAuthorsCommaSeparated} />)
  )
  .add("ArticleByline with author in the beginning", () =>
    story(<ArticleByline ast={authorsAST.authorInTheBeginning} />)
  )
  .add("ArticleByline with author at the end", () =>
    story(<ArticleByline ast={authorsAST.authorAtTheEnd} />)
  )
  .add("ArticleByline with styles", () =>
    story(
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        style={bylineStyles}
      />
    )
  );
