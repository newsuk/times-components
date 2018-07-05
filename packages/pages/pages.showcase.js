import "react-native";
import React from "react";
import { Article, AuthorProfile, Topic } from "./src/pages";

export default {
  name: "Pages/Pages",
  children: [
    {
      type: "story",
      name: "Article",
      component: () => {
        const config = {
          graphqlEndPoint: "https://api.thetimes.co.uk/graphql"
        };
        const ArticlePageView = Article(config)();

        return (
          <ArticlePageView
            articleId="4f1de98e-8042-11e8-af03-7edc8dc9d023"
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
    },
    {
      type: "story",
      name: "AuthorProfile",
      component: () => {
        const config = {
          graphqlEndPoint: "https://api.thetimes.co.uk/graphql"
        };
        const AuthorProfilePageView = AuthorProfile(config)();

        return (
          <AuthorProfilePageView
            authorSlug="deborah-haynes"
            onArticlePress={() => {}}
            onTwitterLinkPress={() => {}}
            analyticsStream={() => {}}
          />
        );
      }
    },
    {
      type: "story",
      name: "Topic",
      component: () => {
        const config = {
          graphqlEndPoint: "https://api.thetimes.co.uk/graphql"
        };
        const TopicPageView = Topic(config)();

        return (
          <TopicPageView
            topicSlug="brexit"
            onArticlePress={() => {}}
            analyticsStream={() => {}}
          />
        );
      }
    }
  ]
};
