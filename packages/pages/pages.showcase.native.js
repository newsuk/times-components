/* eslint-disable react/prop-types */
import React from "react";
import { Article, AuthorProfile, Topic } from "./src/pages";

export default {
  children: [
    {
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
      },
      name: "Article",
      type: "story"
    },
    {
      component: ({ text }) => {
        const authorSlug = text("Author slug", "deborah-haynes");
        const graphqlEndPoint = text(
          "GraphQL Endpoint",
          "https://api.thetimes.co.uk/graphql"
        );

        const config = {
          graphqlEndPoint
        };
        const AuthorProfilePageView = AuthorProfile(config)();

        return (
          <AuthorProfilePageView
            analyticsStream={() => {}}
            authorSlug={authorSlug}
            onArticlePress={() => {}}
            onTwitterLinkPress={() => {}}
          />
        );
      },
      name: "AuthorProfile",
      type: "story"
    },
    {
      component: ({ text }) => {
        const topicSlug = text("Topic slug", "brexit");
        const graphqlEndPoint = text(
          "GraphQL Endpoint",
          "https://api.thetimes.co.uk/graphql"
        );

        const config = {
          graphqlEndPoint
        };
        const TopicPageView = Topic(config)();

        return (
          <TopicPageView
            analyticsStream={() => {}}
            onArticlePress={() => {}}
            topicSlug={topicSlug}
          />
        );
      },
      name: "Topic",
      type: "story"
    }
  ],
  name: "Pages/Pages"
};
