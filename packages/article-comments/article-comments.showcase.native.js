/* eslint-disable react/prop-types */
import React from "react";
import {
  articleComments as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import ArticleComments from "./src/article-comments";

const articleId = "dummy-article-id";

const renderComments = props => (
  <MockFixture
    params={makeParams({
      ...props,
      variables: () => ({
        id: articleId
      })
    })}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        <ArticleComments
          articleId={articleId}
          onCommentGuidelinesPress={() => {}}
          onCommentsPress={() => {}}
          url="dummy-article-url"
        />
      </MockedProvider>
    )}
  />
);
export default {
  children: [
    {
      component: () =>
        renderComments({
          enabled: true
        }),
      name: "Enabled",
      type: "story"
    },
    {
      component: () =>
        renderComments({
          enabled: false
        }),
      name: "Disabled",
      type: "story"
    },
    {
      component: () =>
        renderComments({
          error: () => ({
            message: "Dummy Error"
          })
        }),
      name: "Error",
      type: "story"
    }
  ],
  name: "Composed/Article Comments"
};
