import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { decorateAction } from "@storybook/addon-actions";
import { AuthorProfileProvider } from "@times-components/provider";
import { MockedProvider } from "@times-components/utils/graphql";
// eslint-disable-next-line import/no-unresolved
import { addTypenameToDocument } from "apollo-utilities";
import { query as authorProfileQuery } from "@times-components/provider/author-profile-provider";
import { query as articleListQuery } from "@times-components/provider/article-list-provider";
import storybookReporter from "@times-components/tealium/storybook";
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

const makeAuthor = articleCount => ({
  ...authorProfileFixture.data.author,
  articles: {
    count: articleCount,
    __typename: "Articles"
  }
});

const articlesList = (skip, first, transform = id => id) => ({
  data: {
    author: {
      ...articleListFixture.data.author,
      articles: {
        ...articleListFixture.data.author.articles,
        list: transform(
          articleListFixture.data.author.articles.list.slice(skip, skip + first)
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
        slug: "deborah-haynes"
      }
    },
    result: authorProfileFixture
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "deborah-haynes",
        first: 5,
        skip: 0,
        imageRatio: "3:2"
      }
    },
    result: articlesList(0, 5)
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "deborah-haynes",
        first: 5,
        skip: 5,
        imageRatio: "3:2"
      }
    },
    result: articlesList(5, 5)
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "deborah-haynes",
        first: 5,
        skip: 10,
        imageRatio: "3:2"
      }
    },
    result: articlesList(10, 5)
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "deborah-haynes",
        first: 5,
        skip: 15,
        imageRatio: "3:2"
      }
    },
    result: articlesList(15, 5)
  }
];
const brokenMocks = [
  {
    delay,
    request: {
      query: addTypenameToDocument(authorProfileQuery),
      variables: {
        slug: "deborah-haynes"
      }
    },
    result: authorProfileFixture
  },
  {
    delay,
    request: {
      query: addTypenameToDocument(articleListQuery),
      variables: {
        slug: "deborah-haynes",
        first: 5,
        skip: 0,
        imageRatio: "3:2"
      }
    },
    result: articlesList(0, 5, list =>
      list.map((card, indx) => ({
        ...card,
        summary: [
          {
            name: "paragraph",
            attributes: {},
            children: [
              {
                name: "text",
                attributes: {
                  value: indx === 2 ? "This will error" : "Did not error"
                },
                children: indx === 2 ? {} : []
              }
            ]
          }
        ]
      }))
    )
  }
];

const withMockProvider = child => (
  <MockedProvider mocks={mocks}>{child}</MockedProvider>
);

const withBrokenMockProvider = child => (
  <MockedProvider mocks={brokenMocks}>{child}</MockedProvider>
);

const authProfileProviderProps = {
  slug: "deborah-haynes",
  author: makeAuthor(20),
  isLoading: false,
  page: 2,
  pageSize: 3,
  onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
  onArticlePress: preventDefaultedAction("onArticlePress"),
  analyticsStream: storybookReporter
};
const slug = "deborah-haynes";

const authProfileProvider = withMockProvider(
  <AuthorProfileProvider slug={slug}>
    {({ author, isLoading, error }) => (
      <AuthorProfile
        {...authProfileProviderProps}
        author={author}
        page={1}
        pageSize={5}
        slug={slug}
        isLoading={isLoading}
        error={error}
      />
    )}
  </AuthorProfileProvider>
);

storiesOf("AuthorProfile", module)
  .add("Default", () => {
    const props = {
      slug: "deborah-haynes",
      author: makeAuthor(20),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize: 5,
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
  .add("With an error", () => {
    const props = {
      slug: "deborah-haynes",
      author: makeAuthor(5),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 1,
      pageSize: 5,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return withBrokenMockProvider(<AuthorProfile {...props} />);
  })
  .add("With Provider and Tracking", () => authProfileProvider);
