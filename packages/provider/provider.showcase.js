import React from "react";
import { Text } from "react-native";
import fixture from "@times-components/provider-test-tools/fixtures/author-profile/author-profile.json";
import articleFixture from "@times-components/provider-test-tools/fixtures/article.json";
import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import { MockedProvider } from "@times-components/utils";
import connectGraphql, {
  AuthorProfileProvider,
  ArticleProvider
} from "./src/provider.js";
import { query as authorProfileQuery } from "./src/author-profile";
import { query as articleQuery } from "./src/article";

export default {
  name: "Helpers/Provider",
  children: [
    {
      type: "story",
      name: "Props and fetched data",
      component: () => {
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
      }
    },
    {
      type: "story",
      name: "Errors",
      component: () => {
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
      }
    },
    {
      type: "story",
      name: "Author Profile",
      component: () => {
        const mocks = [
          {
            request: {
              query: addTypenameToDocument(authorProfileQuery),
              variables: {
                slug: "fiona-hamilton"
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
      }
    },
    {
      type: "story",
      name: "Article",
      component: () => {
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
      }
    }
  ]
};
