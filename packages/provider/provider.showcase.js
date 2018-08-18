import React from "react";
import { Text } from "react-native";
import articleFixture from "@times-components/provider-test-tools/fixtures/article";
import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import {
  authorProfile as makeAuthorParams,
  MockedProvider,
  MockFixture,
  topic as makeTopicParams
} from "@times-components/provider-test-tools";
import { authorArticlesWithImages as authorArticlesWithImagesQuery } from "@times-components/provider-queries";
import connectGraphql, {
  ArticleProvider,
  AuthorProfileProvider,
  AuthorArticlesWithImagesProvider,
  TopicProvider,
  TopicArticlesProvider
} from "./src/provider.js";
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
            <WithData debounceTimeMs={0} prop1={1} prop2={2}>
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
            <WithData debounceTimeMs={0} prop1={1} prop2={2}>
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
        const articleImageRatio = "3:2";
        const pageSize = 2;
        const slug = "deborah-haynes";

        return (
          <MockFixture
            params={makeAuthorParams({
              articleQuery: authorArticlesWithImagesQuery,
              articleVariables: iteration => ({
                first: pageSize,
                imageRatio: articleImageRatio,
                skip: (iteration - 1) * pageSize,
                slug
              }),
              pageSize,
              slug
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <AuthorProfileProvider
                  debounceTimeMs={0}
                  page={1}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
                </AuthorProfileProvider>
              </MockedProvider>
            )}
          />
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
            result: articleFixture()
          }
        ];

        return (
          <MockedProvider mocks={mocks}>
            <ArticleProvider
              debounceTimeMs={0}
              id="198c4b2f-ecec-4f34-be53-c89f83bc1b44"
            >
              {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
            </ArticleProvider>
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "Author Profile Articles with Images",
      component: () => {
        const articleImageRatio = "3:2";
        const pageSize = 2;
        const slug = "deborah-haynes";

        return (
          <MockFixture
            params={makeAuthorParams({
              articleQuery: authorArticlesWithImagesQuery,
              articleVariables: iteration => ({
                first: pageSize,
                imageRatio: articleImageRatio,
                skip: (iteration - 1) * pageSize,
                slug
              }),
              pageSize,
              slug
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <AuthorArticlesWithImagesProvider
                  debounceTimeMs={0}
                  page={1}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
                </AuthorArticlesWithImagesProvider>
              </MockedProvider>
            )}
          />
        );
      }
    },
    {
      type: "story",
      name: "Topic",
      component: () => {
        const articleImageRatio = "3:2";
        const name = "Chelsea";
        const pageSize = 2;
        const slug = "chelsea";

        return (
          <MockFixture
            params={makeTopicParams({
              articleVariables: iteration => ({
                first: pageSize,
                imageRatio: articleImageRatio,
                skip: (iteration - 1) * pageSize,
                slug
              }),
              name,
              pageSize,
              slug
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <TopicProvider debounceTimeMs={0} slug="chelsea">
                  {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
                </TopicProvider>
              </MockedProvider>
            )}
          />
        );
      }
    },
    {
      type: "story",
      name: "Topic Articles",
      component: () => {
        const articleImageRatio = "3:2";
        const name = "Chelsea";
        const pageSize = 2;
        const slug = "chelsea";

        return (
          <MockFixture
            params={makeTopicParams({
              articleVariables: iteration => ({
                first: pageSize,
                imageRatio: articleImageRatio,
                skip: (iteration - 1) * pageSize,
                slug
              }),
              name,
              pageSize,
              slug
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <TopicArticlesProvider
                  debounceTimeMs={0}
                  page={1}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
                </TopicArticlesProvider>
              </MockedProvider>
            )}
          />
        );
      }
    }
  ]
};
