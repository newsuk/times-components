// eslint-disable-next-line import/no-unresolved
import { addTypenameToDocument } from "apollo-utilities";
import { query as authorProfileQuery } from "../../author-profile";
import { query as articleListWithImagesQuery } from "../../author-articles-with-images";
import { query as articleListNoImagesQuery } from "../../author-articles-no-images";
import authorProfileFixture from "./author-profile.json";
import articleListWithImagesFixture from "./article-list-with-images.json";
import articleListNoImagesFixture from "./article-list-no-images.json";

export const makeAuthor = ({ count = 20, withImages } = {}) => {
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

export const makeArticleList = (
  { skip, first, withImages },
  transform = id => id
) => {
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

const query = ({ withImages }) =>
  addTypenameToDocument(
    withImages ? articleListWithImagesQuery : articleListNoImagesQuery
  );

const makeVariables = ({ withImages, skip, pageSize, slug }) => {
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
    shortSummaryLength: 220,
    longSummaryLength: 360
  };
};

export const makeArticleMocks = (
  {
    count = 20,
    pageSize = 5,
    withImages = false,
    slug = "deborah-haynes",
    delay = 1000
  } = {},
  transform
) => [
  makeAuthorMock({ count, withImages, slug }),
  ...new Array(Math.ceil(count / pageSize)).fill(0).map((item, indx) => ({
    delay,
    request: {
      query: query({ withImages }),
      variables: makeVariables({
        withImages,
        skip: indx * pageSize,
        pageSize,
        slug
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

export const makeBrokenMocks = ({ count, withImages, pageSize }) =>
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

export const makeMocksWithPageError = ({ withImages, pageSize }) => {
  const [author, ...articles] = makeArticleMocks({
    pageSize,
    withImages
  });
  const [first, , ...last] = articles;

  return [
    author,
    first,
    {
      request: {
        query: query({ withImages }),
        variables: makeVariables({ withImages, skip: pageSize, pageSize })
      },
      error: new Error("Could not get articles")
    },
    ...last
  ];
};

export const makeMocksWithAuthorError = ({ withImages, slug, pageSize }) => {
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
