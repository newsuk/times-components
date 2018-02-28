import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { fonts } from "@times-components/styleguide";
import ArticleByline from "./article-byline";

const authorsAST = require("./fixtures/authors.json");

const bylineStyles = {
  fontSize: 13,
  fontFamily: fonts.supporting,
  color: "#696969",
  lineHeight: 13,
  flexDirection: "row"
};

const bylineLinkStyles = {
  link: {
    color: "red",
    textDecorationLine: "none"
  }
};

storiesOf("Primitives/ArticleByline", module)
  .add("ArticleByline with a single author", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.singleAuthor} />
    </Text>
  ))
  .add("ArticleByline with a text only element", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.singleInlineElement} />
    </Text>
  ))
  .add("ArticleByline with multiple authors", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.multipleAuthorsCommaSeparated} />
    </Text>
  ))
  .add("ArticleByline with author in the beginning", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.authorInTheBeginning} />
    </Text>
  ))
  .add("ArticleByline with author at the end", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.authorAtTheEnd} />
    </Text>
  ))
  .add("ArticleByline with styles", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        style={bylineLinkStyles}
      />
    </Text>
  ));
