import React from "react";
import { Article } from "../src/pages";

export default makeTest => {
  it("renders correctly", () => {
    const config = {};
    const fetch = () => {};
    const ArticlePageView = Article(config)(fetch);

    expect(
      makeTest(
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
    ).toMatchSnapshot();
  });
};
