import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ArticleLabel from "../src/article-label";

module.exports = () => {
  it("renders ArticleLabel", () => {
    const tree = renderer
      .create(<ArticleLabel color="#008347" title="swimming" />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
