/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { MockedProvider } from "@times-components/utils/graphql";
// eslint-disable-next-line import/no-unresolved
import { addTypenameToDocument } from "apollo-utilities";
import { AuthorProfileProvider } from "../provider";
import { query as authorProfileQuery } from "../author-profile";
import fixture from "../fixtures/author-profile.json";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(authorProfileQuery)
    },
    result: fixture
  }
];

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks}>
      <AuthorProfileProvider
        slug="fiona-hamilton"
        pageSize={3}
        page={4}
        articleImageRatio="16:9"
      >
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
