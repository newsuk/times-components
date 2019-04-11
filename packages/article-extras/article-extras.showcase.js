import React from "react";
import { ScrollView } from "react-native";
import {
  articleExtras as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import ArticleExtras from "./src/article-extras";

const renderExtras = props => (
  <MockFixture
    params={makeParams({
      ...props,
      variables: () => ({
        id: "dummy-article-id"
      })
    })}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        <ScrollView>
          <ArticleExtras
            analyticsStream={() => {}}
            articleId="dummy-article-id"
            articleUrl="dummy-article-url"
            onCommentGuidelinesPress={() => {}}
            onCommentsPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
          />
        </ScrollView>
      </MockedProvider>
    )}
  />
);

export default {
  children: [
    {
      component: () => renderExtras(),
      name: "Article Extras",
      type: "story"
    }
  ],
  name: "Composed/Article Extras"
};
