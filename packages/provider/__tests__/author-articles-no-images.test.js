import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils/graphql";
import { AuthorArticlesNoImagesProvider } from "../provider";
import { makeArticleMocks } from "../fixtures/author-profile/fixture-generator";

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={makeArticleMocks({ pageSize: 5, delay: 0 })}>
      <AuthorArticlesNoImagesProvider
        slug="deborah-haynes"
        pageSize={5}
        page={1}
        shortSummaryLength={220}
        longSummaryLength={360}
        debounceTimeMs={0}
      >
        {child}
      </AuthorArticlesNoImagesProvider>
    </MockedProvider>
  );

it("returns query result", done => {
  renderComponent(({ isLoading, author }) => {
    if (!isLoading) {
      expect(author).toMatchSnapshot();
      done();
    }

    return null;
  });
});
