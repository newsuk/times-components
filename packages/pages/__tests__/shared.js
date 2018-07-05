import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { Article } from "../src/pages";

module.exports = () => {
  it("renders correctly", () => {
    const config = {};
    const fetch = () => {};
    const ArticlePageView = Article(config)(fetch);

    const tree = renderer
      .create(
        <ArticlePageView
          articleId="test-article-id"
          analyticsStream={() => {}}
          onArticlePress={() => {}}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onVideoPress={() => {}}
          onTopicPress={() => {}}
          platformAdConfig={{}}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
};
