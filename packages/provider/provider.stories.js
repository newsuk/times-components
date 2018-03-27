import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import { MockedProvider } from "@times-components/utils";
import connectGraphql, {
  AuthorProfileProvider,
  ArticleProvider
} from "./src/provider.js";
import { query as authorProfileQuery } from "./src/author-profile";
import fixture from "./fixtures/author-profile/author-profile.json";
import { query as articleQuery } from "./src/article";
import articleFixture from "./fixtures/article.json";

storiesOf("Helpers/Provider", module)
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
        <WithData prop1={1} prop2={2} debounceTimeMs={0}>
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
        <WithData prop1={1} prop2={2} debounceTimeMs={0}>
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
          debounceTimeMs={0}
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
            id: "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
          }
        },
        result: articleFixture
      }
    ];

    return (
      <MockedProvider mocks={mocks}>
        <ArticleProvider
          id="198c4b2f-ecec-4f34-be53-c89f83bc1b44"
          debounceTimeMs={0}
        >
          {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
        </ArticleProvider>
      </MockedProvider>
    );
  });
