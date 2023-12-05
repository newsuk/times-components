import React from "react";
import { TcText } from "@times-components/utils";
import gql from "graphql-tag";
import {
  article as makeArticleParams,
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

export default {
  children: [
    {
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
              {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
            </WithData>
          </MockedProvider>
        );
      },
      name: "Props and fetched data",
      type: "story"
    },
    {
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
            error: {
              message: "some error from the server"
            },
            request: {
              query
            }
          }
        ];

        return (
          <MockedProvider mocks={mocks} removeTypename>
            <WithData debounceTimeMs={0} prop1={1} prop2={2}>
              {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
            </WithData>
          </MockedProvider>
        );
      },
      name: "Errors",
      type: "story"
    },
    {
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
                  {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
                </AuthorProfileProvider>
              </MockedProvider>
            )}
          />
        );
      },
      name: "Author Profile",
      type: "story"
    },
    {
      component: () => {
        const id = "198c4b2f-ecec-4f34-be53-c89f83bc1b44";

        return (
          <MockFixture
            params={makeArticleParams({
              variables: () => ({
                id
              })
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <ArticleProvider debounceTimeMs={0} id={id}>
                  {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
                </ArticleProvider>
              </MockedProvider>
            )}
          />
        );
      },
      name: "Article",
      type: "story"
    },
    {
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
                  {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
                </AuthorArticlesWithImagesProvider>
              </MockedProvider>
            )}
          />
        );
      },
      name: "Author Profile Articles with Images",
      type: "story"
    },
    {
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
                  {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
                </TopicProvider>
              </MockedProvider>
            )}
          />
        );
      },
      name: "Topic",
      type: "story"
    },
    {
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
                  {props => <TcText>{JSON.stringify(props, null, 2)}</TcText>}
                </TopicArticlesProvider>
              </MockedProvider>
            )}
          />
        );
      },
      name: "Topic Articles",
      type: "story"
    }
  ],
  name: "Helpers/Provider"
};
