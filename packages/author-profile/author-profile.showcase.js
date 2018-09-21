import React from "react";
import { AdComposer } from "@times-components/ad";
import { AuthorProfileProvider } from "@times-components/provider";
import {
  authorProfile as makeParams,
  fixtures,
  MockFixture,
  MockedProvider
} from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import {
  authorArticlesWithImages as authorArticlesWithImagesQuery,
  authorArticlesNoImages as authorArticlesNoImagesQuery
} from "@times-components/provider-queries";
import storybookReporter from "@times-components/tealium-utils";
import AuthorProfile from "./src/author-profile";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const { defaultProps: { adConfig } } = AdComposer;

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress"),
  onTwitterLinkPress: preventDefaultedAction(decorateAction)(
    "onTwitterLinkPress"
  )
});

const articleImageRatio = "3:2";
const pageSize = 20;
const slug = "deborah-haynes";

const makeAuthorProfile = (
  decorateAction,
  params,
  { hasLeadAssets = true } = {}
) => (
  <MockFixture
    params={params}
    render={mocks => (
      <MockedProvider mocks={mocks}>
        <AuthorProfileProvider
          articleImageRatio={articleImageRatio}
          debounceTimeMs={250}
          page={1}
          pageSize={pageSize}
          slug={slug}
        >
          {({
            author,
            isLoading,
            error,
            page,
            pageSize: authorPageSize,
            refetch
          }) => (
            <AuthorProfile
              author={author}
              error={error}
              hasLeadAssets={hasLeadAssets}
              isLoading={isLoading}
              page={page}
              pageSize={authorPageSize}
              refetch={refetch}
              slug={slug}
              {...getProps(decorateAction)}
            />
          )}
        </AuthorProfileProvider>
      </MockedProvider>
    )}
  />
);

export default {
  name: "Pages/Author Profile",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: (_, { decorateAction }) =>
        makeAuthorProfile(
          decorateAction,
          makeParams({
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            makeItem(item, itemIndex) {
              if (fixtures.articleListWithImages[itemIndex]) {
                return fixtures.articleListWithImages[itemIndex];
              }

              return item;
            },
            pageSize,
            slug
          })
        )
    },
    {
      type: "story",
      name: "Default without images",
      component: (_, { decorateAction }) =>
        makeAuthorProfile(
          decorateAction,
          makeParams({
            articleQuery: authorArticlesNoImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              longSummaryLength: 360,
              shortSummaryLength: 220,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            hasLeadAssets: false,
            makeItem(item, itemIndex) {
              if (fixtures.articleListNoImages[itemIndex]) {
                return {
                  ...fixtures.articleListNoImages[itemIndex],
                  summary(__, { maxCharCount }) {
                    if (maxCharCount === 360) {
                      return fixtures.articleListNoImages[itemIndex]
                        .longSummary;
                    }

                    return fixtures.articleListNoImages[itemIndex].shortSummary;
                  }
                };
              }

              return item;
            },
            pageSize,
            slug
          }),
          {
            hasLeadAssets: false
          }
        )
    },
    {
      type: "story",
      name: "Loading",
      component: (_, { decorateAction }) => (
        <MockedProvider isLoading mocks={[]}>
          <AuthorProfile
            {...getProps(decorateAction)}
            isLoading
            refetch={() => {}}
            slug={slug}
          />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error getting author",
      component: (_, { decorateAction }) =>
        makeAuthorProfile(
          decorateAction,
          makeParams({
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            authorError: () => new Error("Author Error"),
            pageSize,
            slug
          })
        )
    },
    {
      type: "story",
      name: "With an error getting articles",
      component: (_, { decorateAction }) =>
        makeAuthorProfile(
          decorateAction,
          makeParams({
            articleError: () => new Error("Broken Page"),
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            pageSize,
            slug
          })
        )
    },
    {
      type: "story",
      name: "With an error on pagination",
      component: (_, { decorateAction }) =>
        makeAuthorProfile(
          decorateAction,
          makeParams({
            articleError: iteration =>
              iteration === 2 ? new Error("Broken Page") : null,
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            pageSize,
            slug
          })
        )
    },
    {
      type: "story",
      name: "With an error rendering a card",
      component: (_, { decorateAction }) =>
        makeAuthorProfile(
          decorateAction,
          makeParams({
            articleQuery: authorArticlesWithImagesQuery,
            articleVariables: iteration => ({
              first: pageSize,
              imageRatio: articleImageRatio,
              skip: (iteration - 1) * pageSize,
              slug
            }),
            makeItem: (item, itemIndex) => ({
              ...item,
              summary:
                itemIndex === 2
                  ? [
                      {
                        name: "paragraph",
                        attributes: {},
                        children: [
                          {
                            name: "text",
                            attributes: {
                              value: "This will error"
                            },
                            children: {}
                          }
                        ]
                      }
                    ]
                  : item.summary
            }),
            pageSize,
            slug
          })
        )
    },
    {
      type: "story",
      name: "With Provider and Tracking",
      component: (_, { decorateAction }) => (
        <StorybookProvider>
          <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
            {({ author, error, isLoading }) => (
              <AuthorProfile
                {...getProps(decorateAction)}
                author={author}
                error={error}
                isLoading={isLoading}
              />
            )}
          </AuthorProfileProvider>
        </StorybookProvider>
      )
    }
  ]
};
