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

const addProp = (obj, key, value) => {
  if (value != null) {
    return {
      ...obj,
      [key]: value
    };
  }

  return obj;
};

const makeCustomArticles = (
  count,
  {
    byline = () => {},
    headline = () => {},
    id = () => {},
    label = () => {},
    leadAsset = () => {},
    longSummary = () => {},
    publicationName = () => {},
    publishedTime = () => {},
    section = () => {},
    shortSummary = () => {},
    summary = () => {},
    url = () => {}
  }
) => {
  const articles = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < count + 1; i++) {
    const props = [
      ["byline", byline(i)],
      ["headline", headline(i)],
      ["id", id(i)],
      ["label", label(i)],
      ["leadAsset", leadAsset(i)],
      ["longSummary", longSummary(i)],
      ["publicationName", publicationName(i)],
      ["publishedTime", publishedTime(i)],
      ["section", section(i)],
      ["shortSummary", shortSummary(i)],
      ["summary", summary(i)],
      ["url", url(i)]
    ];

    const article = props.reduce(
      (obj, [key, value]) => addProp(obj, key, value),
      {
        __typename: "Article"
      }
    );

    articles.push(article);
  }

  return articles;
};

const defaultArticleWithImagesList = fixtures => {
  const getFixture = prop => indx => fixtures[indx - 1][prop];

  return makeCustomArticles(10, {
    headline: getFixture("headline"),
    id: getFixture("id"),
    label: getFixture("label"),
    leadAsset: getFixture("leadAsset"),
    publicationName: getFixture("publicationName"),
    publishedTime: getFixture("publishedTime"),
    summary: getFixture("summary"),
    url: getFixture("url")
  });
};

const defaultArticleNoImagesList = fixtures => {
  const getFixture = prop => indx => fixtures[indx][prop];

  return makeCustomArticles(10, {
    headline: getFixture("headline"),
    id: getFixture("id"),
    label: getFixture("label"),
    leadAsset: getFixture("leadAsset"),
    longSummary: getFixture("longSummary"),
    publicationName: getFixture("publicationName"),
    publishedTime: getFixture("publishedTime"),
    shortSummary: getFixture("shortSummary"),
    url: getFixture("url")
  });
};

const defaultTopicList = fixtures => {
  const getFixture = prop => indx => fixtures[indx - 1][prop];

  return makeCustomArticles(10, {
    byline: getFixture("byline"),
    headline: getFixture("headline"),
    id: getFixture("id"),
    label: getFixture("label"),
    leadAsset: getFixture("leadAsset"),
    publicationName: getFixture("publicationName"),
    publishedTime: getFixture("publishedTime"),
    section: getFixture("section"),
    summary: getFixture("summary"),
    url: getFixture("url")
  });
};

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
    "Chelsea is known for its affluent residents and the posh shops and restaurants that cater to them." +
    " It’s a cultural haven too, with the Royal Court Theatre on " +
    "Sloane Square and the modern Saatchi Gallery on the Duke of York Square." +
    " Close by, busy King’s Road is lined with mid- to high-end stores.",
  __typename: "Topic"
});

const makeArticleList = (
  { list, first, skip, withImages },
  transform = id => id
) => {
  const articles = withImages
    ? {
        count: 20,
        list:
          list || defaultArticleWithImagesList(articleListWithImagesFixture),
        __typename: "Articles"
      }
    : {
        count: 20,
        list: list || defaultArticleNoImagesList(articleListNoImagesFixture),
        __typename: "Articles"
      };

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

const makeTopicArticleList = (
  { first, list = defaultTopicList(topicFixture), skip },
  transform = id => id
) => ({
  data: {
    topic: {
      articles: {
        __typename: "Articles",
        count: 50,
        list: transform(list.slice(skip, skip + first))
      },
      __typename: "Topic"
    }
  }
});

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
    list,
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
        first: pageSize,
        list,
        skip: indx * pageSize,
        withImages
      },
      transform
    )
  }))
];

const makeTopicArticleMocks = (
  {
    count = 50,
    delay = 1000,
    empty = false,
    list,
    pageSize = 20,
    slug = "chelsea",
    withImages = true
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
        first: empty ? 0 : pageSize,
        list,
        skip: indx * pageSize,
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
  makeCustomArticles,
  makeMocksWithPageError,
  makeMocksWithAuthorError,
  makeTopicArticleMocks,
  makeMocksWithTopicError
};
