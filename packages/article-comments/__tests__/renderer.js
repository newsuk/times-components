import React from "react";
import TestRenderer from "react-test-renderer";
import {
  articleComments as makeParams,
  MockedProvider,
  schemaToMocks
} from "@times-components/provider-test-tools";
import { delay } from "@times-components/test-utils";
import ArticleComments from "../src/article-comments";

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

export default ({ count, enabled, error, onReady }) => {
  renderWithMocks({
    component: (
      <ArticleComments
        articleId="dummy-article-id"
        isEnabled={enabled}
        onCommentGuidelinesPress={() => {}}
        onCommentsPress={() => {}}
        spotAccountId=""
        url="dummy-article-url"
      />
    ),
    onReady,
    params: makeParams({
      count,
      enabled,
      error,
      variables: () => ({
        id: "dummy-article-id"
      })
    })
  });
};
