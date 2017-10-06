/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { ApolloClient, IntrospectionFragmentMatcher } from "react-apollo";
import { MockedProvider, mockNetworkInterface } from "react-apollo/test-utils";
import { addTypenameToDocument } from "apollo-client";
import { AuthorProfileProvider } from "../provider";
import { query as authorProfileQuery } from "../author-profile-provider";
import fixture from "../fixtures/author-profile.json";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(authorProfileQuery)
    },
    result: fixture
  }
];

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = mockNetworkInterface(...mocks);

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const renderComponent = child =>
  renderer.create(
    <MockedProvider mocks={mocks} client={client}>
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
