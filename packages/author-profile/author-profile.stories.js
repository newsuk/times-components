import React from "react";
import { storiesOf } from "@storybook/react-native";
import { decorateAction } from "@storybook/addon-actions";
import { MockedProvider, fragmentMatcher } from "@times-components/utils";
import { storybookReporter } from "@times-components/tealium";
import {
  AuthorProfileProvider,
  fixtureGenerator
} from "@times-components/provider";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import AuthorProfile from "./src/author-profile";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const slug = "deborah-haynes";
const pageSize = 5;

storiesOf("Pages/AuthorProfile", module)
  .add("Default with images", () => {
    const props = {
      slug,
      author: fixtureGenerator.makeAuthor({ withImages: true }),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
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
  })
  .add("Default without images", () => {
    const props = {
      slug: "deborah-haynes",
      author: fixtureGenerator.makeAuthor(),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={fixtureGenerator.makeArticleMocks({ pageSize })}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("Loading", () => {
    const props = {
      slug: "deborah-haynes",
      isLoading: true,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return <AuthorProfile {...props} />;
  })
  .add("With an error getting author", () => (
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
            onTwitterLinkPress={preventDefaultedAction("onTwitterLinkPress")}
            onArticlePress={preventDefaultedAction("onArticlePress")}
            analyticsStream={storybookReporter}
          />
        )}
      </AuthorProfileProvider>
    </MockedProvider>
  ))
  .add("With an error getting articles", () => {
    const props = {
      slug,
      author: fixtureGenerator.makeAuthor({ withImages: true }),
      isLoading: false,
      page: 1,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
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
  })
  .add("With an error rendering a card", () => {
    const props = {
      slug,
      author: fixtureGenerator.makeAuthor({ withImages: true }),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 1,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider
        mocks={fixtureGenerator.makeBrokenMocks({ withImages: true, pageSize })}
      >
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("With Provider and Tracking", () => {
    const props = {
      slug,
      page: 2,
      pageSize,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    const withProvider = child => {
      const uri = process.env.STORYBOOK_ENDPOINT;

      if (uri) {
        const client = new ApolloClient({
          link: new HttpLink({
            uri,
            useGETForQueries: true,
            headers: {
              "content-type": "application/x-www-form-urlencoded"
            }
          }),
          cache: new InMemoryCache({
            fragmentMatcher
          })
        });

        return (
          <ApolloProvider debounceTimeMs={250} client={client}>
            {child}
          </ApolloProvider>
        );
      }

      return (
        <MockedProvider
          mocks={fixtureGenerator.makeArticleMocks({
            withImages: true,
            pageSize
          })}
        >
          {child}
        </MockedProvider>
      );
    };

    return withProvider(
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
    );
  });
