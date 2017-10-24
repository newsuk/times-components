import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import { decorateAction, action } from "@storybook/addon-actions";
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
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: () => {}
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
      analyticsStream: () => {}
    };

    return <AuthorProfileContent {...props} />;
  })
  .add("Empty State", () => {
    const emptyMocks = [
      {
        request: {
          query: addTypenameToDocument(authorProfileQuery),
          variables: {
            slug: "no-results"
          }
        },
        result: authorProfileFixture
      },
      {
        request: {
          query: addTypenameToDocument(articleListQuery),
          variables: {
            slug: "no-results",
            first: 3,
            skip: 0,
            imageRatio: "3:2"
          }
        },
        result: {
          data: {
            author: {
              ...articleListFixture.data.author,
              articles: {
                ...articleListFixture.data.author.articles,
                count: 0,
                list: []
              }
            }
          }
        }
      }
    ];

    const emptyNetworkInterface = mockNetworkInterface(...emptyMocks);
    const props = {
      articleImageRatio: "3:2",
      author: authorProfileFixture.data.author,
      isLoading: false,
      onArticlePress: preventDefaultedAction("onArticlePress"),
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      analyticsStream: () => {},
      slug: "no-results"
    };

    const client = new ApolloClient({
      networkInterface: emptyNetworkInterface,
      fragmentMatcher
    });

    return withMockProvider(<AuthorProfile {...props} />, client);
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
            analyticsStream={() => {}}
          />
        )}
      </AuthorProfileProvider>
    );
  })
  .add("Tracking", () => {
    const props = {
      slug: "fiona-hamilton",
      author: authorProfileFixture.data.author,
      isLoading: false,
      page: 2,
      pageSize: 3,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: action("analytics-event")
    };

    return withMockProvider(<AuthorProfile {...props} />);
  });
