import React from "react";
import { Text } from "react-native";
import authorProfileFixture from "@times-components/provider-test-tools/fixtures/author-profile/author-profile.json";
import topicFixture from "@times-components/provider-test-tools/fixtures/topic.json";
import articleFixture from "@times-components/provider-test-tools/fixtures/article.json";
import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import connectGraphql, {
  ArticleProvider,
  AuthorProfileProvider,
  AuthorArticlesWithImagesProvider,
  TopicProvider,
  TopicArticlesProvider
} from "./src/provider.js";
import { query as articleQuery } from "./src/article";
import { query as authorProfileQuery } from "./src/author-profile";
import { query as topicQuery } from "./src/topic";

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
        const mocks = [
          {
            request: {
              query: addTypenameToDocument(authorProfileQuery),
              variables: {
                slug: "fiona-hamilton"
              }
            },
            result: authorProfileFixture
          }
        ];

        return (
          <MockedProvider mocks={mocks}>
            <AuthorProfileProvider
              articleImageRatio="16:9"
              debounceTimeMs={0}
              page={4}
              pageSize={3}
              slug="fiona-hamilton"
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
        const mocks = fixtureGenerator.makeArticleMocks({
          withImages: true,
          pageSize: 5,
          delay: 0
        });
        return (
          <MockedProvider mocks={mocks}>
            <AuthorArticlesWithImagesProvider
              debounceTimeMs={0}
              page={1}
              pageSize={5}
              slug="deborah-haynes"
            >
              {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
            </AuthorArticlesWithImagesProvider>
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "Topic",
      component: () => {
        const mocks = [
          {
            request: {
              query: addTypenameToDocument(topicQuery),
              variables: {
                slug: "chelsea"
              }
            },
            result: topicFixture
          }
        ];

        return (
          <MockedProvider mocks={mocks}>
            <TopicProvider debounceTimeMs={0} slug="chelsea">
              {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
            </TopicProvider>
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "Topic Articles",
      component: () => {
        const mocks = fixtureGenerator.makeTopicArticleMocks({
          withImages: true,
          pageSize: 5,
          delay: 0
        });
        return (
          <MockedProvider mocks={mocks}>
            <TopicArticlesProvider
              debounceTimeMs={0}
              page={1}
              pageSize={5}
              slug="chelsea"
            >
              {props => <Text>{JSON.stringify(props, null, 2)}</Text>}
            </TopicArticlesProvider>
          </MockedProvider>
        );
      }
    }
  ]
};
