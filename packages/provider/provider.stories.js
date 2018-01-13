import React from "react";
import { Text } from "react-native";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import { MockedProvider } from "@times-components/utils/graphql";
import connectGraphql, {
  AuthorProfileProvider,
  ArticleProvider
} from "./provider.js";
import { query as authorProfileQuery } from "./author-profile";
import fixture from "./fixtures/author-profile/author-profile.json";
import { query as articleQuery } from "./article";
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

    return (
      <MockedProvider mocks={mocks}>
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

    return (
      <MockedProvider mocks={mocks}>
        <ArticleProvider id="3107c018-cb60-11e4-81dd-064fe933cd41">
          {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
        </ArticleProvider>
      </MockedProvider>
    );
  });
