import React from "react";
import renderer from "react-test-renderer";
import {
  authorProfile as makeAuthorParams,
  MockedProvider,
  MockFixture
} from "@times-components/provider-test-tools";
import { authorArticlesWithImages as authorArticlesWithImagesQuery } from "@times-components/provider-queries";
import { AuthorArticlesWithImagesProvider } from "../src/provider";

const renderComponent = child => {
  const articleImageRatio = "3:2";
  const pageSize = 1;
  const slug = "deborah-haynes";

  return renderer.create(
    <MockFixture
      params={makeAuthorParams({
        articleQuery: authorArticlesWithImagesQuery,
        articleVariables: iteration => ({
          first: pageSize,
          imageRatio: articleImageRatio,
          skip: (iteration - 1) * pageSize,
          slug
        }),
        pageSize,
        slug
      })}
      render={mocks => (
        <MockedProvider mocks={mocks}>
          <AuthorArticlesWithImagesProvider
            debounceTimeMs={0}
            page={1}
            pageSize={pageSize}
            slug={slug}
          >
            {child}
          </AuthorArticlesWithImagesProvider>
        </MockedProvider>
      )}
    />
  );
};

describe("AuthorArticlesWithImagesProvider", () => {
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
