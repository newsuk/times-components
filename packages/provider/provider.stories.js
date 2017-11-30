import React from "react";
import { Text } from "react-native";
import { ApolloClient, IntrospectionFragmentMatcher, gql } from "react-apollo";
import { MockedProvider, mockNetworkInterface } from "react-apollo/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { addTypenameToDocument } from "apollo-client";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "../../storybook/storiesOfOverloader";
import connectGraphql, {
  AuthorProfileProvider,
  ArticleProvider
} from "./provider.js";
import { query as authorProfileQuery } from "./author-profile-provider";
import fixture from "./fixtures/author-profile.json";
import { query as articleQuery } from "./article-provider";
import articleFixture from "./fixtures/article.json";

storiesOf("Provider", module)
  .add("Props and fetched data", () => {
    const query = gql`
      {
        author(slug: "fiona-hamilton") {
          name
        }
      }
    `;

    const WithData = connectGraphql(query);

    const mocks = [
      {
        request: {
          query
        },
        result: {
          data: {
            author: {
              name: "fiona-hamilton"
            }
          }
        }
      }
    ];

    return (
      <MockedProvider mocks={mocks} removeTypename>
        <WithData prop1={1} prop2={2}>
          {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
        </WithData>
      </MockedProvider>
    );
  })
  .add("Errors", () => {
    const query = gql`
      {
        author(slug: "fiona-hamilton") {
          name
        }
      }
    `;

    const WithData = connectGraphql(query);

    const mocks = [
      {
        request: {
          query
        },
        error: {
          message: "some error from the server"
        }
      }
    ];

    return (
      <MockedProvider mocks={mocks} removeTypename>
        <WithData prop1={1} prop2={2}>
          {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
        </WithData>
      </MockedProvider>
    );
  })
  .add("Author Profile", () => {
    const mocks = [
      {
        request: {
          query: addTypenameToDocument(authorProfileQuery),
          variables: {
            slug: "fiona-hamilton",
            first: 3,
            skip: 9,
            imageRatio: "16:9"
          }
        },
        result: fixture
      }
    ];

    const networkInterface = mockNetworkInterface(...mocks);

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

    const client = new ApolloClient({
      networkInterface,
      fragmentMatcher
    });

    return (
      <MockedProvider mocks={mocks} client={client}>
        <AuthorProfileProvider
          slug="fiona-hamilton"
          pageSize={3}
          page={4}
          articleImageRatio="16:9"
        >
          {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
        </AuthorProfileProvider>
      </MockedProvider>
    );
  })
  .add("Article", () => {
    const mocks = [
      {
        request: {
          query: addTypenameToDocument(articleQuery),
          variables: {
            id: "3107c018-cb60-11e4-81dd-064fe933cd41"
          }
        },
        result: articleFixture
      }
    ];

    const networkInterface = mockNetworkInterface(...mocks);

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

    const client = new ApolloClient({
      networkInterface,
      fragmentMatcher
    });

    return (
      <MockedProvider mocks={mocks} client={client}>
        <ArticleProvider id="3107c018-cb60-11e4-81dd-064fe933cd41">
          {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
        </ArticleProvider>
      </MockedProvider>
    );
  });
