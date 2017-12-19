import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { decorateAction } from "@storybook/addon-actions";
import { AuthorProfileProvider } from "@times-components/provider";
import { MockedProvider } from "@times-components/utils/graphql";
// eslint-disable-next-line import/no-unresolved
import { addTypenameToDocument } from "apollo-utilities";
import { query as authorProfileQuery } from "@times-components/provider/author-profile";
import { query as articleListWithImagesQuery } from "@times-components/provider/author-articles-with-images";
import { query as articleListNoImagesQuery } from "@times-components/provider/author-articles-no-images";
import storybookReporter from "@times-components/tealium/storybook";
import AuthorProfile from "./author-profile";
import AuthorProfileContent from "./author-profile-content";
import authorProfileFixture from "./fixtures/author-profile.json";
import articleListWithImagesFixture from "./fixtures/article-list-with-images.json";
import articleListNoImagesFixture from "./fixtures/article-list-no-images.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const makeAuthor = (articleCount, { withImages } = {}) => {
  if (withImages) {
    return {
      ...authorProfileFixture.data.author,
      hasLeadAssets: true,
      articles: {
        count: articleCount,
        __typename: "Articles"
      }
    };
  }

  return {
    ...authorProfileFixture.data.author,
    hasLeadAssets: false,
    articles: {
      count: articleCount,
      __typename: "Articles"
    }
  };
};

const articlesList = ({ skip, first, withImages }, transform = id => id) => {
  const articles = withImages
    ? articleListWithImagesFixture.data.author.articles
    : articleListNoImagesFixture.data.author.articles;
  return {
    data: {
      author: {
        ...articleListWithImagesFixture.data.author,
        articles: {
          ...articles,
          list: transform(articles.list.slice(skip, skip + first))
        }
      }
    }
  };
};

const delay = 1000;
const makeMocks = ({ count = 20, withImages } = {}) => {
  const query = addTypenameToDocument(
    withImages ? articleListWithImagesQuery : articleListNoImagesQuery
  );
  const makeVariables = skip => {
    if (withImages) {
      return {
        slug: "deborah-haynes",
        first: 5,
        skip,
        imageRatio: "3:2"
      };
    }

    return {
      slug: "deborah-haynes",
      first: 5,
      skip,
      shortSummaryLength: 220,
      longSummaryLength: 360
    };
  };

  return [
    {
      delay,
      request: {
        query: addTypenameToDocument(authorProfileQuery),
        variables: {
          slug: "deborah-haynes"
        }
      },
      result: {
        data: {
          author: {
            ...makeAuthor(count, { withImages })
          }
        }
      }
    },
    {
      delay,
      request: {
        query,
        variables: makeVariables(0)
      },
      result: articlesList({ skip: 0, first: 5, withImages })
    },
    {
      delay,
      request: {
        query,
        variables: makeVariables(5)
      },
      result: articlesList({ skip: 5, first: 5, withImages })
    },
    {
      delay,
      request: {
        query,
        variables: makeVariables(10)
      },
      result: articlesList({ skip: 10, first: 5, withImages })
    },
    {
      delay,
      request: {
        query,
        variables: makeVariables(15)
      },
      result: articlesList({ skip: 15, first: 5, withImages })
    }
  ];
};
const makeBrokenMocks = ({ count = 5, withImages }) => {
  const query = addTypenameToDocument(
    withImages ? articleListWithImagesQuery : articleListNoImagesQuery
  );

  return [
    {
      delay,
      request: {
        query: addTypenameToDocument(authorProfileQuery),
        variables: {
          slug: "deborah-haynes"
        }
      },
      result: {
        data: {
          author: {
            ...makeAuthor(count, { withImages })
          }
        }
      }
    },
    {
      delay,
      request: {
        query,
        variables: {
          slug: "deborah-haynes",
          first: 5,
          skip: 0,
          imageRatio: "3:2"
        }
      },
      result: articlesList({ skip: 0, first: 5, withImages }, list =>
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
};

const withArticlesErroredMockProvider = child => {
  const erroredArticlesMocks = [
    {
      request: {
        query: addTypenameToDocument(authorProfileQuery),
        variables: {
          slug: "deborah-haynes"
        }
      },
      result: authorProfileFixture
    },
    {
      request: {
        query: addTypenameToDocument(articleListWithImagesQuery),
        variables: {
          slug: "deborah-haynes",
          first: 5,
          skip: 0,
          imageRatio: "3:2"
        }
      },
      error: {
        msg: "Could not get articles"
      }
    },
    {
      request: {
        query: addTypenameToDocument(articleListWithImagesQuery),
        variables: {
          slug: "deborah-haynes",
          first: 5,
          skip: 0,
          imageRatio: "3:2"
        }
      },
      result: articlesList({ skip: 0, first: 5, withImages: true })
    }
  ];

  return <MockedProvider mocks={erroredArticlesMocks}>{child}</MockedProvider>;
};

const withAuthorErroredMockProvider = child => {
  const erroredAuthorMocks = [
    {
      request: {
        query: addTypenameToDocument(authorProfileQuery),
        variables: {
          slug: "deborah-haynes"
        }
      },
      error: {
        msg: "Could not get author"
      }
    },
    {
      request: {
        query: addTypenameToDocument(authorProfileQuery),
        variables: {
          slug: "deborah-haynes"
        }
      },
      result: {
        data: {
          author: {
            ...makeAuthor(5, { withImages: true })
          }
        }
      }
    },
    {
      request: {
        query: addTypenameToDocument(articleListWithImagesQuery),
        variables: {
          slug: "deborah-haynes",
          first: 5,
          skip: 0,
          imageRatio: "3:2"
        }
      },
      result: articlesList({ skip: 0, first: 5, withImages: true })
    }
  ];

  return <MockedProvider mocks={erroredAuthorMocks}>{child}</MockedProvider>;
};

storiesOf("AuthorProfile", module)
  .add("Default with images", () => {
    const props = {
      slug: "deborah-haynes",
      author: makeAuthor(20, { withImages: true }),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 2,
      pageSize: 5,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={makeMocks({ withImages: true })}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("Default without images", () => {
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

    return (
      <MockedProvider mocks={makeMocks()}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
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
  .add("With an error getting author", () => {
    const slug = "deborah-haynes";

    return withAuthorErroredMockProvider(
      <AuthorProfileProvider slug={slug}>
        {({ author, isLoading, error, refetch }) => (
          <AuthorProfile
            author={author}
            page={1}
            refetch={refetch}
            pageSize={5}
            slug={slug}
            isLoading={isLoading}
            error={error}
            onTwitterLinkPress={preventDefaultedAction("onTwitterLinkPress")}
            onArticlePress={preventDefaultedAction("onArticlePress")}
            analyticsStream={storybookReporter}
          />
        )}
      </AuthorProfileProvider>
    );
  })
  .add("With an error getting articles", () => {
    const props = {
      slug: "deborah-haynes",
      author: makeAuthor(5),
      isLoading: false,
      page: 1,
      pageSize: 5,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return withArticlesErroredMockProvider(<AuthorProfile {...props} />);
  })
  .add("With an error rendering a card", () => {
    const props = {
      slug: "deborah-haynes",
      author: makeAuthor(5, { withImages: true }),
      articleImageRatio: "3:2",
      isLoading: false,
      page: 1,
      pageSize: 5,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={makeBrokenMocks({ withImages: true })}>
        <AuthorProfile {...props} />
      </MockedProvider>
    );
  })
  .add("With Provider and Tracking", () => {
    const props = {
      slug: "deborah-haynes",
      page: 2,
      pageSize: 5,
      onTwitterLinkPress: preventDefaultedAction("onTwitterLinkPress"),
      onArticlePress: preventDefaultedAction("onArticlePress"),
      analyticsStream: storybookReporter
    };

    return (
      <MockedProvider mocks={makeMocks({ withImages: true })}>
        <AuthorProfileProvider slug={props.slug}>
          {({ author, isLoading, error }) => (
            <AuthorProfile
              author={author}
              isLoading={isLoading}
              error={error}
              {...props}
            />
          )}
        </AuthorProfileProvider>
      </MockedProvider>
    );
  });
