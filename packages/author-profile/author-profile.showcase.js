import React from "react";
import { MockedProvider } from "@times-components/utils";
import storybookReporter from "@times-components/tealium-utils";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import { AuthorProfileProvider } from "@times-components/provider";
import AuthorProfile from "./src/author-profile";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const slug = "deborah-haynes";
const pageSize = 5;

export default {
  name: "Pages/Author Profile",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: (_, { decorateAction }) => {
        const props = {
          slug,
          author: fixtureGenerator.makeAuthor({ withImages: true }),
          articleImageRatio: "3:2",
          isLoading: false,
          page: 2,
          pageSize,
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          analyticsStream: storybookReporter
        };

        return (
          <MockedProvider
            mocks={fixtureGenerator.makeArticleMocks({
              withImages: true,
              slug,
              pageSize
            })}
          >
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
          slug: "deborah-haynes",
          author: fixtureGenerator.makeAuthor(),
          articleImageRatio: "3:2",
          isLoading: false,
          page: 2,
          pageSize,
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          analyticsStream: storybookReporter
        };

        return (
          <MockedProvider
            mocks={fixtureGenerator.makeArticleMocks({ pageSize })}
          >
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
          slug: "deborah-haynes",
          isLoading: true,
          pageSize,
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          analyticsStream: storybookReporter
        };

        return <AuthorProfile {...props} />;
      }
    },
    {
      type: "story",
      name: "With an error getting author",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeMocksWithAuthorError({
            slug,
            pageSize,
            withImages: true
          })}
        >
          <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
            {({ author, isLoading, error, refetch }) => (
              <AuthorProfile
                author={author}
                page={1}
                refetch={refetch}
                pageSize={pageSize}
                slug={slug}
                isLoading={isLoading}
                error={error}
                onTwitterLinkPress={preventDefaultedAction(decorateAction)(
                  "onTwitterLinkPress"
                )}
                onArticlePress={preventDefaultedAction(decorateAction)(
                  "onArticlePress"
                )}
                analyticsStream={storybookReporter}
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
          slug,
          author: fixtureGenerator.makeAuthor({ withImages: true }),
          isLoading: false,
          page: 1,
          pageSize,
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          analyticsStream: storybookReporter
        };

        return (
          <MockedProvider
            mocks={fixtureGenerator.makeMocksWithPageError({
              withImages: true,
              pageSize
            })}
          >
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
          slug,
          author: fixtureGenerator.makeAuthor({ withImages: true }),
          articleImageRatio: "3:2",
          isLoading: false,
          page: 1,
          pageSize,
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          analyticsStream: storybookReporter
        };

        return (
          <MockedProvider
            mocks={fixtureGenerator.makeBrokenMocks({
              withImages: true,
              pageSize
            })}
          >
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
          slug,
          page: 2,
          pageSize,
          onTwitterLinkPress: preventDefaultedAction(decorateAction)(
            "onTwitterLinkPress"
          ),
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          analyticsStream: storybookReporter
        };

        const mocks = fixtureGenerator.makeArticleMocks({
          withImages: true,
          pageSize
        });

        return (
          <StorybookProvider mocks={mocks}>
            <AuthorProfileProvider debounceTimeMs={0} slug={slug}>
              {({ author, isLoading, error }) => (
                <AuthorProfile
                  author={author}
                  isLoading={isLoading}
                  error={error}
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
