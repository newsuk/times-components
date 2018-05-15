import React from "react";
import { AuthorProfileProvider } from "@times-components/provider";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { MockedProvider } from "@times-components/utils";
import AuthorProfile from "./src/author-profile";

import mockArticles from "./fixtures/article-list-with-images.json";
import mockArticlesWithoutImages from "./fixtures/article-list-no-images.json";
import mockAuthor from "./fixtures/author-profile.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const page = 2;
const pageSize = 5;
const slug = "deborah-haynes";

export default {
  name: "Pages/Author Profile",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          articleImageRatio: "3:2",
          author: mockAuthor,
          isLoading: false,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          page,
          pageSize,
          slug
        };

        return (
          <MockedProvider mocks={mockArticles}>
            <AuthorProfile {...props} />
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "Default without images",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          articleImageRatio: "3:2",
          author: mockAuthor,
          isLoading: false,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          page,
          pageSize,
          slug: "deborah-haynes"
        };

        return (
          <MockedProvider mocks={mockArticlesWithoutImages}>
            <AuthorProfile {...props} />
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "Loading",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          isLoading: true,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          pageSize,
          slug: "deborah-haynes"
        };

        return (
          <MockedProvider mocks={mockArticles}>
            <AuthorProfile {...props} />
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "With an error getting author",
      component: (_, { decorateAction }) => (
        <MockedProvider mocks={mockArticles}>
          <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
            {({ author, error, isLoading, refetch }) => (
              <AuthorProfile
                analyticsStream={storybookReporter}
                author={author}
                error={error}
                isLoading={isLoading}
                onArticlePress={preventDefaultedAction(decorateAction)(
                  "onArticlePress"
                )}
                onTwitterLinkPress={preventDefaultedAction(decorateAction)(
                  "onTwitterLinkPress"
                )}
                page={1}
                pageSize={pageSize}
                refetch={refetch}
                slug={slug}
              />
            )}
          </AuthorProfileProvider>
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error getting articles",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          author: mockAuthor,
          isLoading: false,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          page: 1,
          pageSize,
          slug
        };

        return (
          <MockedProvider mocks={mockArticles}>
            <AuthorProfile {...props} />
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "With an error rendering a card",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          articleImageRatio: "3:2",
          author: mockAuthor,
          isLoading: false,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          page: 1,
          pageSize,
          slug
        };

        return (
          <MockedProvider mocks={mockArticles}>
            <AuthorProfile {...props} />
          </MockedProvider>
        );
      }
    },
    {
      type: "story",
      name: "With Provider and Tracking",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          page,
          pageSize,
          slug
        };

        return (
          <StorybookProvider mocks={mockArticles}>
            <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
              {({ author, error, isLoading }) => (
                <AuthorProfile
                  author={author}
                  error={error}
                  isLoading={isLoading}
                  {...props}
                />
              )}
            </AuthorProfileProvider>
          </StorybookProvider>
        );
      }
    }
  ]
};
