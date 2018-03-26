import "raf/polyfill";
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleByline from "../article-byline";

const authorsAST = require("../fixtures/authors.json");

const bylineStyles = {
  link: {
    color: "red",
    textDecorationLine: "underline"
  }
};

module.exports = () => {
  it("renders correctly with a single author", () => {
    const tree = renderer
      .create(<ArticleByline ast={authorsAST.singleAuthor} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with a single inline element", () => {
    const tree = renderer
      .create(<ArticleByline ast={authorsAST.singleInlineElement} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with the author in the begining", () => {
    const tree = renderer
      .create(<ArticleByline ast={authorsAST.authorInTheBeginning} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with the author at the end", () => {
    const tree = renderer
      .create(<ArticleByline ast={authorsAST.authorAtTheEnd} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with multiple authors separated by text with commas", () => {
    const tree = renderer
      .create(<ArticleByline ast={authorsAST.multipleAuthorsCommaSeparated} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with multiple authors separated by spaces", () => {
    const tree = renderer
      .create(<ArticleByline ast={authorsAST.multipleAuthorsSpaceSeparated} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with an empty AST (empty byline on DB)", () => {
    const tree = renderer.create(<ArticleByline ast={[]} />).toJSON();
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
};
