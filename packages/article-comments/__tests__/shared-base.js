import React from "react";
import TestRenderer from "react-test-renderer";
import {
  articleComments as makeParams,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import { iterator } from "@times-components/test-utils";
import ArticleComments from "../src/article-comments";

export default () => {
  iterator([
    {
      name: "comments error",
      test: async () => {
        const testInstance = TestRenderer.create(
          <MockFixture
            params={makeParams({
              enabled: true,
              variables: () => ({
                id: "dummy-article-id"
              })
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <ArticleComments
                  articleId="dummy-article-id"
                  onCommentGuidelinesPress={() => { }}
                  onCommentsPress={() => { }}
                  url="dummy-article-url"
                />
              </MockedProvider>
            )}
          />
        );

        expect(testInstance).toMatchSnapshot();
      }
    }
  ]);
};
