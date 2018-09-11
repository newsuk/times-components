/* eslint-disable react/prop-types */
import React from "react";
import { Article } from "./src/pages";

export default {
  name: "Pages with provider",
  children: [
    {
      type: "story",
      name: "Article",
      component: ({ text }) => {
        const articleId = text(
          "Article id",
          "4938a3d4-8109-11e8-a645-f0478472c67b"
        );
        const graphqlEndPoint = text(
          "GraphQL Endpoint",
          "https://api.thetimes.co.uk/graphql"
        );

        const config = {
          graphqlEndPoint
        };
        const ArticlePageView = Article(config)();

        return (
          <ArticlePageView
            analyticsStream={() => {}}
            articleId={articleId}
            onArticlePress={() => {}}
            onAuthorPress={() => {}}
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onLinkPress={() => {}}
            onTopicPress={() => {}}
            onVideoPress={() => {}}
            platformAdConfig={{ sectionName: "news" }}
          />
        );
      }
    }
  ]
};
