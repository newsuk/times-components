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
import authorProfileFixture from "./fixtures/author-profile.json";
import articleListFixture from "./fixtures/article-list.json";

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

const mocks = [
  {
    request: {
      query: addTypenameToDocument(authorProfileQuery),
      variables: {
        slug: "fiona-hamilton"
      }
    },
    result: authorProfileFixture
  },
  {
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

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher
});

const withMockProvider = child => (
  <MockedProvider mocks={mocks} client={client}>
    {child}
  </MockedProvider>
);

storiesOf("AuthorProfile", module)
  .add("Default", () => {
    const props = {
      ...authorProfileFixture.data,
      isLoading: false,
      page: 2,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress")
    };

    return withMockProvider(<AuthorProfile {...props} />);
  })
  .add("Loading", () => {
    const props = {
      isLoading: true,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress")
    };

    return withMockProvider(<AuthorProfile {...props} />);
  })
  .add("Empty State", () => {
    const props = {
      isLoading: false,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress")
    };

    return withMockProvider(<AuthorProfile {...props} />);
  })
  .add("With Provider", () => {
    const onTwitterLinkPress = preventDefaultedAction("onTwitterLinkPress");
    const onArticlePress = preventDefaultedAction("onArticlePress");
    const slug = "fiona-hamilton";

    return withMockProvider(
      <AuthorProfileProvider slug={slug}>
        {({ author, isLoading, error }) => (
          <AuthorProfile
            author={author}
            page={1}
            pageSize={3}
            slug={slug}
            isLoading={isLoading}
            error={error}
            onTwitterLinkPress={onTwitterLinkPress}
            onArticlePress={onArticlePress}
          />
        )}
      </AuthorProfileProvider>
    );
  });
