import React from "react";
import renderer from "react-test-renderer";
import {
  authorProfile as makeAuthorParams,
  MockedProvider,
  MockFixture
} from "@times-components/provider-test-tools";
import { authorArticlesNoImages as authorArticlesNoImagesQuery } from "@times-components/provider-queries";
import { AuthorArticlesNoImagesProvider } from "../../src/provider";

const renderComponent = child => {
  const pageSize = 1;
  const slug = "deborah-haynes";

  return renderer.create(
    <MockFixture
      params={makeAuthorParams({
        articleQuery: authorArticlesNoImagesQuery,
        articleVariables: iteration => ({
          first: pageSize,
          longSummaryLength: 360,
          shortSummaryLength: 220,
          skip: (iteration - 1) * pageSize,
          slug
        }),
        hasLeadAssets: false,
        pageSize,
        slug
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <AuthorArticlesNoImagesProvider
            debounceTimeMs={0}
            page={1}
            pageSize={pageSize}
            slug={slug}
          >
            {child}
          </AuthorArticlesNoImagesProvider>
        </MockedProvider>
      )}
    />
  );
};

describe("AuthorArticlesNoImagesProvider", () => {
  it("returns query result", done => {
    renderComponent(({ isLoading, author }) => {
      if (!isLoading) {
        expect(author).toMatchSnapshot();
        done();
      }

      return null;
    });
  });
});
