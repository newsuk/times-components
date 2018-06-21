import React from "react";
import { View } from "react-native";
import renderer from "react-test-renderer";
import authorsFixture from "../fixtures/authors.json";

const styles = {
  link: {
    color: "red",
    textDecorationLine: "underline"
  }
};

export default Component => {
  const renderArticleByline = props =>
    renderer.create(
      <View>
        <Component {...props} />
      </View>
    );

  it("should render with a single author", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.singleAuthor
    });
    expect(tree).toMatchSnapshot("1. Render a single author");
  });

  it("should render with a given section colour", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.singleAuthor,
      color: "blue"
    });

    expect(tree).toMatchSnapshot("2. Render a given section colour");
  });

  it("should render with given styles", () => {
    const tree = renderArticleByline({
      ast: authorsFixture.singleAuthor,
      style: styles
    });

    expect(tree).toMatchSnapshot("3. Render an author with given styles");
  });
};
