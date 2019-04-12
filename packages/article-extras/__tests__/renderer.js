import React from "react";
import TestRenderer from "react-test-renderer";
import {
  articleExtras as makeParams,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import { delay } from "@times-components/test-utils";
import ArticleExtras from "../src";

const renderWithMocks = ({ component, onReady, params }) => {
  schemaToMocks(params).then(mocks => {
    const testInstance = TestRenderer.create(
      <MockedProvider mocks={mocks}>{component}</MockedProvider>
    );
    delay(1).then(() => {
      onReady(testInstance);
    });
  });
};

export default ({ error, onReady }) => {
  renderWithMocks({
    component: (
      <ArticleExtras
        analyticsStream={() => {}}
        articleId="dummy-article-id"
        articleUrl="dummy-article-url"
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        onRelatedArticlePress={() => {}}
        onTopicPress={() => {}}
      />
    ),
    onReady,
    params: makeParams({
      error,
      variables: () => ({
        id: "dummy-article-id"
      })
    })
  });
};
