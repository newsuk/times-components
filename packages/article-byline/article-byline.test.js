/* eslint-env jest */

import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleByline from "./article-byline";

const authorsAST = require("./fixtures/authors.json");

const bylineStyles = {
  byline: {
    color: "blue"
  },
  link: {
    color: "red",
    textDecorationLine: "underline"
  }
};

it("renders correctly with a single author", () => {
  const tree = renderer
    .create(<ArticleByline ast={authorsAST.singleAuthor} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with multiple authors, titles and texts", () => {
  const tree = renderer
    .create(<ArticleByline ast={authorsAST.multipleAuthors} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with styles", () => {
  const tree = renderer
    .create(
      <ArticleByline ast={authorsAST.singleAuthor} style={bylineStyles} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
