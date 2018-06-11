import "raf/polyfill";
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleByline from "../src/article-byline";
import authorsFixture from "../fixtures/authors.json";

const styles = {
  link: {
    color: "red",
    textDecorationLine: "underline"
  }
};

export default () => {
  it("should render with a single author", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.singleAuthor} />
    );
    expect(tree).toMatchSnapshot("1. Render a single author");
  });

  it("should render with a given section colour", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.singleAuthor} color="blue" />
    );
    expect(tree).toMatchSnapshot("2. Render a given section colour");
  });

  it("should render with a single inline element", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.singleInlineElement} />
    );
    expect(tree).toMatchSnapshot("3. Render an inline element");
  });

  it("should render with the author in the begining", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.authorInTheBeginning} />
    );
    expect(tree).toMatchSnapshot("4. Render an author first");
  });

  it("should render with the author at the end", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.authorAtTheEnd} />
    );
    expect(tree).toMatchSnapshot("5. Render an author last");
  });

  it("should render with multiple authors separated by text with commas", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.multipleAuthorsCommaSeparated} />
    );
    expect(tree).toMatchSnapshot(
      "6. Render multiple authors separated by commas"
    );
  });

  it("should render with multiple authors separated by spaces", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.multipleAuthorsSpaceSeparated} />
    );
    expect(tree).toMatchSnapshot(
      "7. Render multiple authors separated by spaces"
    );
  });

  it("should render null with an empty AST", () => {
    const tree = renderer.create(<ArticleByline ast={[]} />);
    expect(tree).toMatchSnapshot("8. Render null when AST is empty");
  });

  it("should render with given styles", () => {
    const tree = renderer.create(
      <ArticleByline ast={authorsFixture.singleAuthor} style={styles} />
    );
    expect(tree).toMatchSnapshot("9. Render an author with given styles");
  });
};
