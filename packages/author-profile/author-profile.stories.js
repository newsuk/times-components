import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction } from "@storybook/addon-actions";
import { AuthorProfileProvider } from "@times-components/provider";
import { ApolloClient, IntrospectionFragmentMatcher } from "react-apollo";
import { MockedProvider, mockNetworkInterface } from "react-apollo/test-utils";
// eslint-disable-next-line import/no-extraneous-dependencies
import { addTypenameToDocument } from "apollo-client";
import { query as authorProfileQuery } from "@times-components/provider/author-profile-provider";
import { query as articleListQuery } from "@times-components/provider/article-list-provider";
import AuthorProfile from "./author-profile";
import AuthorProfileContent from "./author-profile-content";
import authorProfileFixture from "./fixtures/author-profile.json";
import articleListFixture from "./fixtures/article-list.json";
import storybookReporter from "../../storybook/storybook-tealium-reporter";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const articlesList = (skip, first) => ({
  data: {
    author: {
      ...articleListFixture.data.author,
      articles: {
        ...articleListFixture.data.author.articles,
        list: articleListFixture.data.author.articles.list.slice(
          skip,
          skip + first
        )
      }
    }
  }
});

const delay = 1000;
const mocks = [
  {
    delay,
    request: {
      query: addTypenameToDocument(authorProfileQuery),
      variables: {
        slug: "fiona-hamilton"
      }
    },
    result: authorProfileFixture
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 0,
        imageRatio: "3:2"
      }
    },
    result: articlesList(0, 3)
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 3,
        imageRatio: "3:2"
      }
    },
    result: articlesList(3, 3)
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 6,
        imageRatio: "3:2"
      }
    },
    result: articlesList(6, 3)
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "fiona-hamilton",
        first: 3,
        skip: 9,
        imageRatio: "3:2"
      }
    },
    result: articlesList(9, 3)
  }
];

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "UNION",
          name: "Media",
          possibleTypes: [
            {
              name: "Image"
            },
            {
              name: "Video"
            }
          ]
        }
      ]
    }
  }
});

const networkInterface = mockNetworkInterface(...mocks);

const defaultClient = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const withMockProvider = (child, client = defaultClient) => (
  <MockedProvider mocks={mocks} client={client}>
    {child}
  </MockedProvider>
);

storiesOf("AuthorProfile", module)
  .add("Default", () => {
    const props = {
      slug: "fiona-hamilton",
      author: authorProfileFixture.data.author,
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return withMockProvider(<AuthorProfile {...props} />);
  })
  .add("Loading", () => {
    const props = {
      isLoading: true,
      articlesLoading: true,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return <AuthorProfileContent {...props} />;
  })
  .add("With Provider and Tracking", () => {
    const props = {
      slug: "fiona-hamilton",
      author: authorProfileFixture.data.author,
      isLoading: false,
      page: 2,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };
    const slug = "fiona-hamilton";

    return withMockProvider(
      <AuthorProfileProvider slug={slug}>
        {({ author, isLoading, error }) => (
          <AuthorProfile
            {...props}
            author={author}
            isLoading={isLoading}
            error={error}
          />
        )}
      </AuthorProfileProvider>
    );
  });
