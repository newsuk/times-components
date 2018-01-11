/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils/graphql";
import { AuthorArticlesWithImagesProvider } from "../provider";
import { makeArticleMocks } from "../fixtures/author-profile/fixture-generator";

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={makeArticleMocks({ withImages: true, pageSize: 5, delay: 0 })}
    >
      <AuthorArticlesWithImagesProvider
        slug="deborah-haynes"
        pageSise={5}
        page={1}
      >
        {child}
      </AuthorArticlesWithImagesProvider>
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
