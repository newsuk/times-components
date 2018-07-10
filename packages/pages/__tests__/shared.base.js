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
          analyticsStream={() => {}}
          articleId="test-article-id"
          onArticlePress={() => {}}
          onAuthorPress={() => {}}
          onLinkPress={() => {}}
          onTopicPress={() => {}}
          onVideoPress={() => {}}
          platformAdConfig={{}}
        />
      )
    ).toMatchSnapshot();
  });
};
