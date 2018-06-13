import { addTypenameToDocument } from "apollo-utilities";
import {
  authorProfileQuery,
  articleListNoImagesQuery,
  articleListWithImagesQuery,
  topicQuery,
  topicArticlesQuery
} from "@times-components/provider";
import authorProfileFixture from "../fixtures/author-profile/author-profile.json";
import articleListWithImagesFixture from "../fixtures/author-profile/article-list-with-images.json";
import articleListNoImagesFixture from "../fixtures/author-profile/article-list-no-images.json";
import topicFixture from "../fixtures/topic-articles.json";

const makeAuthor = ({ count = 20, withImages } = {}) => {
  if (withImages) {
    return {
      ...authorProfileFixture.data.author,
      hasLeadAssets: true,
      articles: {
        count,
        __typename: "Articles"
      }
    };
  }

  return {
    ...authorProfileFixture.data.author,
    hasLeadAssets: false,
    articles: {
      count,
      __typename: "Articles"
    }
  };
};

const makeTopic = () => ({
  name: "Chelsea",
  description:
    "Chelsea is known for its affluent residents and the posh shops and restaurants that cater to them. It’s a cultural haven too, with the Royal Court Theatre on Sloane Square and the modern Saatchi Gallery on the Duke of York Square. Close by, busy King’s Road is lined with mid- to high-end stores.",
  __typename: "Topic"
});

const makeArticleList = ({ skip, first, withImages }, transform = id => id) => {
  const articles = withImages
    ? articleListWithImagesFixture.data.author.articles
    : articleListNoImagesFixture.data.author.articles;
  return {
    data: {
      author: {
        articles: {
          ...articles,
          list: transform(articles.list.slice(skip, skip + first)),
          __typename: "Articles"
        },
        __typename: "Author"
      }
    }
  };
};

const makeTopicArticleList = ({ skip, first }, transform = id => id) => {
  const { articles } = topicFixture.data.topic;

  return {
    data: {
      topic: {
        articles: {
          ...articles,
          list: transform(articles.list.slice(skip, skip + first)),
          __typename: "Articles"
        },
        __typename: "Topic"
      }
    }
  };
};

const makeAuthorMock = ({ count, withImages, slug, delay = 1000 }) => ({
  delay,
  request: {
    query: addTypenameToDocument(authorProfileQuery),
    variables: {
      slug
    }
  },
  result: {
    data: {
      author: {
        ...makeAuthor({ count, withImages })
      }
    }
  }
});

const makeTopicMock = ({ count, slug, delay = 1000 }) => ({
  delay,
  request: {
    query: addTypenameToDocument(topicQuery),
    variables: {
      slug
    }
  },
  result: {
    data: {
      topic: {
        ...makeTopic({ count })
      }
    }
  }
});

const query = ({ withImages }) =>
  addTypenameToDocument(
    withImages ? articleListWithImagesQuery : articleListNoImagesQuery
  );

const makeVariables = ({
  longSummaryLength,
  pageSize,
  shortSummaryLength,
  skip,
  slug,
  withImages
}) => {
  if (withImages) {
    return {
      slug,
      first: pageSize,
      skip,
      imageRatio: "3:2"
    };
  }

  return {
    slug,
    first: pageSize,
    skip,
    shortSummaryLength,
    longSummaryLength
  };
};

const makeArticleMocks = (
  {
    count = 20,
    delay = 1000,
    longSummaryLength = 220,
    pageSize = 5,
    shortSummaryLength = 220,
    slug = "deborah-haynes",
    withImages = false
  } = {},
  transform
) => [
  makeAuthorMock({ count, withImages, slug }),
  ...new Array(Math.ceil(count / pageSize)).fill(0).map((item, indx) => ({
    delay,
    request: {
      query: query({ withImages }),
      variables: makeVariables({
        longSummaryLength,
        pageSize,
        shortSummaryLength,
        skip: indx * pageSize,
        slug,
        withImages
      })
    },
    result: makeArticleList(
      {
        skip: indx * pageSize,
        first: pageSize,
        withImages
      },
      transform
    )
  }))
];

const makeTopicArticleMocks = (
  {
    count = 10,
    pageSize = 5,
    withImages = true,
    slug = "chelsea",
    delay = 1000
  } = {},
  transform
) => [
  makeTopicMock({ count, withImages, slug }),
  ...new Array(Math.ceil(count / pageSize)).fill(0).map((item, indx) => ({
    delay,
    request: {
      query: addTypenameToDocument(topicArticlesQuery),
      variables: makeVariables({
        withImages,
        skip: indx * pageSize,
        pageSize,
        slug
      })
    },
    result: makeTopicArticleList(
      {
        skip: indx * pageSize,
        first: pageSize,
        withImages
      },
      transform
    )
  }))
];

const makeBrokenMocks = ({ count, withImages, pageSize }) =>
  makeArticleMocks({ count, withImages, pageSize }, list =>
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
  );

const makeMocksWithPageError = ({ withImages, pageSize }) => {
  const [author, ...articles] = makeArticleMocks({
    pageSize,
    withImages
  });

  const [first, second, ...last] = articles;

  return [
    author,
    first,
    {
      delay: second.delay,
      request: second.request,
      error: new Error("Could not get articles")
    },
    second,
    ...last
  ];
};

const makeMocksWithAuthorError = ({ withImages, slug, pageSize }) => {
  const [, ...articles] = makeArticleMocks({
    withImages,
    slug,
    pageSize
  });

  return [
    {
      request: {
        query: addTypenameToDocument(authorProfileQuery),
        variables: {
          slug
        }
      },
      error: new Error("Could not get author")
    },
    makeAuthorMock({ withImages, slug }),
    ...articles
  ];
};

const makeMocksWithTopicError = ({ withImages, slug, pageSize }) => {
  const [, ...articles] = makeTopicArticleMocks({
    withImages,
    slug,
    pageSize
  });

  return [
    {
      request: {
        query: addTypenameToDocument(topicQuery),
        variables: {
          slug
        }
      },
      error: new Error("Could not get topic")
    },
    makeTopicMock({ withImages, slug }),
    ...articles
  ];
};

export default {
  makeAuthor,
  makeArticleList,
  makeAuthorMock,
  makeVariables,
  makeArticleMocks,
  makeBrokenMocks,
  makeMocksWithPageError,
  makeMocksWithAuthorError,
  makeTopicArticleMocks,
  makeMocksWithTopicError
};
