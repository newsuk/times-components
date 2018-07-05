import "react-native";
import React from "react";
import { Article } from "./src/pages";

export default {
  name: "Pages",
  children: [
    {
      type: "story",
      name: "Article",
      component: () => {
        const config = {};
        const fetch = () => {};
        const ArticlePageView = Article(config)(fetch);

        return (
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
        );
      }
    }
  ]
};
