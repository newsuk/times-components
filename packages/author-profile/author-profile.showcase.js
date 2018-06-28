import "react-native";
import React from "react";
import { AdComposer } from "@times-components/ad";
import { AuthorProfileProvider } from "@times-components/provider";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { MockedProvider } from "@times-components/utils";
import AuthorProfile from "./src/author-profile";
import longSummaryLength from "./author-profile-constants";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const slug = "deborah-haynes";
const pageSize = 5;

const mockArticles = fixtureGenerator.makeArticleMocks({
  pageSize,
  slug,
  withImages: true
});
const mockArticlesWithoutImages = fixtureGenerator.makeArticleMocks({
  longSummaryLength,
  pageSize,
  slug,
  withImages: false
});
const mockAuthor = fixtureGenerator.makeAuthor({ withImages: true });
const mockAuthorWithoutImages = fixtureGenerator.makeAuthor({
  withImages: false
});

const { defaultProps: { adConfig } } = AdComposer;

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  articleImageRatio: "3:2",
  author: mockAuthor,
  isLoading: false,
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress"),
  onTwitterLinkPress: preventDefaultedAction(decorateAction)(
    "onTwitterLinkPress"
  ),
  page: 1,
  pageSize,
  slug
});

export default {
  name: "Pages/Author Profile",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: (_, { decorateAction }) => (
        <MockedProvider mocks={mockArticles}>
          <AuthorProfile {...getProps(decorateAction)} />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "Default without images",
      component: (_, { decorateAction }) => (
        <MockedProvider mocks={mockArticlesWithoutImages}>
          <AuthorProfile
            {...getProps(decorateAction)}
            author={mockAuthorWithoutImages}
          />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "Loading",
      component: (_, { decorateAction }) => (
        <MockedProvider mocks={mockArticles} isLoading>
          <AuthorProfile {...getProps(decorateAction)} isLoading />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error getting author",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeMocksWithAuthorError({
            pageSize,
            slug,
            withImages: true
          })}
        >
          <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
            {({ author, error, isLoading, refetch }) => (
              <AuthorProfile
                {...getProps(decorateAction)}
                author={author}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
              />
            )}
          </AuthorProfileProvider>
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error getting articles",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeMocksWithPageError({
            pageSize,
            withImages: true
          })}
        >
          <AuthorProfile {...getProps(decorateAction)} page={2} />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error on pagination",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeMocksWithPageError({
            pageSize,
            withImages: true
          })}
        >
          <AuthorProfile {...getProps(decorateAction)} />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error rendering a card",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeBrokenMocks({
            pageSize,
            withImages: true
          })}
        >
          <AuthorProfile {...getProps(decorateAction)} />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With Provider and Tracking",
      component: (_, { decorateAction }) => (
        <StorybookProvider mocks={mockArticles}>
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
