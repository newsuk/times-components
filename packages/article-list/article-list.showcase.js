import React from "react";
import { Text, View } from "react-native";
import storybookReporter from "@times-components/tealium-utils";
import { withTrackingContext } from "@times-components/tracking";
import {
  authorProfile as makeAuthorParams,
  MockedProvider,
  MockFixture
} from "@times-components/provider-test-tools";
import Context from "@times-components/context";
import {
  authorArticlesNoImages as authorArticlesNoImagesQuery,
  authorArticlesWithImages as authorArticlesWithImagesQuery
} from "@times-components/provider-queries";
import {
  AuthorArticlesNoImagesProvider,
  AuthorArticlesWithImagesProvider
} from "@times-components/provider";
import get from "lodash.get";
import ArticleList, { ArticleListPageError } from "./src/article-list";
import adConfig from "./fixtures/article-ad-config.json";
import { ratioTextToFloat } from "../utils/dist";

const makeArticleUrl = ({ slug, shortIdentifier }) =>
  slug && shortIdentifier
    ? `https://www.thetimes.co.uk/article/${slug}-${shortIdentifier}`
    : "";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  emptyStateMessage:
    "Unfortunately, there are no articles relating to this page",
  fetchMore: () => Promise.resolve(),
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress"),
  onNext: preventDefaultedAction(decorateAction)("onNext"),
  onPrev: preventDefaultedAction(decorateAction)("onPrev"),
  refetch: preventDefaultedAction(decorateAction)("refetch")
});

const TrackedArticleList = withTrackingContext(ArticleList, {
  trackingObjectName: "ArticleList"
});

const articleImageRatio = "3:2";
const count = 200;
const emptyStateMessage = "Empty State";
const page = 1;
const pageSize = 10;
const slug = "deborah-haynes";

export default {
  children: [
    {
      component: (_, { decorateAction }) => (
        <MockFixture
          params={makeAuthorParams({
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            count,
            pageSize,
            slug
          })}
          render={mocks => (
            <MockedProvider mocks={mocks}>
              <Context.Provider value={{ makeArticleUrl }}>
                <AuthorArticlesWithImagesProvider
                  debounceTimeMs={0}
                  page={page}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {({
                    author: data,
                    error: articlesError,
                    isLoading: articlesLoading,
                    page: articlePage,
                    pageSize: articlePageSize,
                    variables: { imageRatio = "3:2" }
                  }) => (
                    <TrackedArticleList
                      articles={get(data, "articles.list", [])}
                      articlesLoading={articlesLoading}
                      count={count}
                      emptyStateMessage={emptyStateMessage}
                      error={articlesError}
                      imageRatio={ratioTextToFloat(imageRatio)}
                      page={articlePage}
                      pageSize={articlePageSize}
                      showImages
                      {...getProps(decorateAction)}
                    />
                  )}
                </AuthorArticlesWithImagesProvider>
              </Context.Provider>
            </MockedProvider>
          )}
        />
      ),
      name: "Default with images",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <MockFixture
          params={makeAuthorParams({
            articleQuery: authorArticlesNoImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              longSummaryLength: 360,
              shortSummaryLength: 220,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            count,
            hasLeadAssets: false,
            pageSize,
            slug
          })}
          render={mocks => (
            <MockedProvider mocks={mocks}>
              <Context.Provider value={{ makeArticleUrl }}>
                <AuthorArticlesNoImagesProvider
                  debounceTimeMs={0}
                  page={page}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {({
                    author: data,
                    error: articlesError,
                    isLoading: articlesLoading,
                    page: articlePage,
                    pageSize: articlePageSize
                  }) => (
                    <TrackedArticleList
                      articles={get(data, "articles.list", [])}
                      articlesLoading={articlesLoading}
                      count={count}
                      emptyStateMessage={emptyStateMessage}
                      error={articlesError}
                      page={articlePage}
                      pageSize={articlePageSize}
                      showImages={false}
                      {...getProps(decorateAction)}
                    />
                  )}
                </AuthorArticlesNoImagesProvider>
              </Context.Provider>
            </MockedProvider>
          )}
        />
      ),
      name: "Default without images",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <MockFixture
          params={makeAuthorParams({
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            count,
            makeItem: (item, itemIndex) => {
              if (itemIndex === 1) {
                return {
                  ...item,
                  headline: null,
                  shortHeadline: `Short Headline ${itemIndex}`
                };
              }

              return item;
            },
            pageSize,
            slug
          })}
          render={mocks => (
            <MockedProvider mocks={mocks}>
              <Context.Provider value={{ makeArticleUrl }}>
                <AuthorArticlesWithImagesProvider
                  debounceTimeMs={0}
                  page={page}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {({
                    author: data,
                    error: articlesError,
                    isLoading: articlesLoading,
                    page: articlePage,
                    pageSize: articlePageSize,
                    variables: { imageRatio = "3:2" }
                  }) => (
                    <TrackedArticleList
                      articles={get(data, "articles.list", [])}
                      articlesLoading={articlesLoading}
                      count={count}
                      emptyStateMessage={emptyStateMessage}
                      error={articlesError}
                      imageRatio={ratioTextToFloat(imageRatio)}
                      page={articlePage}
                      pageSize={articlePageSize}
                      showImages
                      {...getProps(decorateAction)}
                    />
                  )}
                </AuthorArticlesWithImagesProvider>
              </Context.Provider>
            </MockedProvider>
          )}
        />
      ),
      name: "With a short headline",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => {
        const articleListHeader = (
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#999",
              height: 100,
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Text style={{ color: "#FFF" }}>Article List Header</Text>
          </View>
        );

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
              count,
              pageSize,
              slug
            })}
            render={mocks => (
              <MockedProvider mocks={mocks}>
                <Context.Provider value={{ makeArticleUrl }}>
                  <AuthorArticlesWithImagesProvider
                    debounceTimeMs={0}
                    page={page}
                    pageSize={pageSize}
                    slug={slug}
                  >
                    {({
                      author: data,
                      error: articlesError,
                      isLoading: articlesLoading,
                      page: articlePage,
                      pageSize: articlePageSize,
                      variables: { imageRatio = "3:2" }
                    }) => (
                      <TrackedArticleList
                        articleListHeader={articleListHeader}
                        articles={get(data, "articles.list", [])}
                        articlesLoading={articlesLoading}
                        count={count}
                        emptyStateMessage={emptyStateMessage}
                        error={articlesError}
                        imageRatio={ratioTextToFloat(imageRatio)}
                        page={articlePage}
                        pageSize={articlePageSize}
                        showImages
                        {...getProps(decorateAction)}
                      />
                    )}
                  </AuthorArticlesWithImagesProvider>
                </Context.Provider>
              </MockedProvider>
            )}
          />
        );
      },
      name: "With a header",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <TrackedArticleList {...getProps(decorateAction)} articlesLoading />
      ),
      name: "Loading articles",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ArticleListPageError
          refetch={preventDefaultedAction(decorateAction)("refetch")}
        />
      ),
      name: "Error getting page-level data",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <MockFixture
          params={makeAuthorParams({
            articleError: () => new Error("Some Error"),
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            count,
            pageSize,
            slug
          })}
          render={mocks => (
            <MockedProvider mocks={mocks}>
              <Context.Provider value={{ makeArticleUrl }}>
                <AuthorArticlesWithImagesProvider
                  debounceTimeMs={0}
                  page={page}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {({
                    author: data,
                    error: articlesError,
                    isLoading: articlesLoading,
                    page: articlePage,
                    pageSize: articlePageSize,
                    variables: { imageRatio = "3:2" }
                  }) => (
                    <TrackedArticleList
                      articles={get(data, "articles.list", [])}
                      articlesLoading={articlesLoading}
                      count={count}
                      emptyStateMessage={emptyStateMessage}
                      error={articlesError}
                      imageRatio={ratioTextToFloat(imageRatio)}
                      page={articlePage}
                      pageSize={articlePageSize}
                      showImages
                      {...getProps(decorateAction)}
                    />
                  )}
                </AuthorArticlesWithImagesProvider>
              </Context.Provider>
            </MockedProvider>
          )}
        />
      ),
      name: "Error getting article list data",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <MockFixture
          params={makeAuthorParams({
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            count: 0,
            pageSize,
            slug
          })}
          render={mocks => (
            <MockedProvider mocks={mocks}>
              <Context.Provider value={{ makeArticleUrl }}>
                <AuthorArticlesWithImagesProvider
                  debounceTimeMs={0}
                  page={page}
                  pageSize={pageSize}
                  slug={slug}
                >
                  {({
                    author: data,
                    error: articlesError,
                    isLoading: articlesLoading,
                    page: articlePage,
                    pageSize: articlePageSize,
                    variables: { imageRatio = "3:2" }
                  }) => (
                    <TrackedArticleList
                      articles={get(data, "articles.list", [])}
                      articlesLoading={articlesLoading}
                      count={count}
                      emptyStateMessage={emptyStateMessage}
                      error={articlesError}
                      imageRatio={ratioTextToFloat(imageRatio)}
                      page={articlePage}
                      pageSize={articlePageSize}
                      showImages
                      {...getProps(decorateAction)}
                    />
                  )}
                </AuthorArticlesWithImagesProvider>
              </Context.Provider>
            </MockedProvider>
          )}
        />
      ),
      name: "Empty article list",
      type: "story"
    }
  ],
  name: "Composed/Article List"
};
