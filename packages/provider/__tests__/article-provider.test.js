/* eslint-env jest */

import React from "react";
import renderer from "react-test-renderer";
import { ApolloClient, IntrospectionFragmentMatcher } from "react-apollo";
import { MockedProvider, mockNetworkInterface } from "react-apollo/test-utils";
import { addTypenameToDocument } from "apollo-client";
import { ArticleProvider } from "../provider";
import { query as articleQuery } from "../article-provider";
import fixture from "../fixtures/article.json";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(articleQuery)
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
      <ArticleProvider id="3107c018-cb60-11e4-81dd-064fe933cd41">
        {child}
      </ArticleProvider>
    </MockedProvider>
  );

it("returns query result", done => {
  renderComponent(({ isLoading, article }) => {
    if (!isLoading) {
      expect(article).toMatchSnapshot();
      done();
    }

    return null;
  });
});
