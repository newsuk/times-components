import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils/graphql";
import { AuthorProfileProvider } from "../provider";
import { makeArticleMocks } from "../fixtures/author-profile/fixture-generator";

const renderComponent = child =>
  renderer.create(
    <MockedProvider
      mocks={makeArticleMocks({ withImages: true, pageSize: 5, delay: 0 })}
    >
      <AuthorProfileProvider slug="deborah-haynes" debounceTimeMs={0}>
        {child}
      </AuthorProfileProvider>
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
