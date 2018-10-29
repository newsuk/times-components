import React from "react";
import renderer from "react-test-renderer";
import {
  MockedProvider,
  MockFixture,
  articleComments as makeArticleCommentsParams
} from "@times-components/provider-test-tools";
import { ArticleCommentsProvider } from "../src/provider";

const renderComponent = child => {
  const id = "113e9875-b7bf-4dd7-ac99-dee231bf6e74";

  return renderer.create(
    <MockFixture
      params={makeArticleCommentsParams({
        count: 123,
        enabled: true,
        id,
        variables: () => ({
          id
        })
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <ArticleCommentsProvider debounceTimeMs={0} id={id}>
            {child}
          </ArticleCommentsProvider>
        </MockedProvider>
      )}
    />
  );
};

describe("ArticleCommentsProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, article }) => {
      if (!isLoading) {
        expect(article).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
