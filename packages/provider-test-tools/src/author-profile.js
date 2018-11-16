import { MockList } from "graphql-tools";
import { author as authorQuery } from "@times-components/provider-queries";
import generateQueries from "./generate-queries";

const biography = [
  {
    attributes: {
      value: "Deborah Haynes is the defence editor at "
    },
    children: [],
    name: "text"
  },
  {
    attributes: {},
    children: [
      {
        attributes: {
          value: "The Times"
        },
        children: [],
        name: "text"
      }
    ],
    name: "italic"
  },
  {
    attributes: {
      value:
        ", covering the most important defence & security news in the UK and around the world."
    },
    children: [],
    name: "text"
  }
];

const generateAuthors = ({ count, error, hasLeadAssets, slug }) => {
  const query = {
    defaults: {
      values: {
        author: () => ({
          __typename: "Author",
          articles: {
            __typename: "Articles",
            count
          },
          biography,
          hasLeadAssets,
          image: "//www.thetimes.co.uk/d/img/profile/deborah-haynes.jpg",
          jobTitle: "Defence Editor",
          name: "Deborah Haynes",
          twitter: "jdoe",
          id: "so-m-e-id"
        })
      }
    },
    query: authorQuery,
    variables: {
      slug
    }
  };

  if (error) {
    return [
      {
        ...query,
        error: error()
      },
      query
    ];
  }

  return [query];
};

const makeItem = (item, itemIndex) => {
  if (fixtures.articleListNoImages[itemIndex]) {
    return {
      ...fixtures.articleListNoImages[itemIndex],
      summary(__, { maxCharCount }) {
        if (maxCharCount === 360) {
          return fixtures.articleListNoImages[itemIndex]
            .longSummary;
        }

        return fixtures.articleListNoImages[itemIndex].shortSummary;
      }
    };
  }

  return item;
}

export default ({
  articleError = () => {},
  articleVariables = () => {},
  authorError,
  count = 200,
  hasLeadAssets = true,
  makeItem,
  pageSize,
  slug
}) => {
  console.log('author profiel us>>>>');

    return [
  ...generateAuthors({ count, error: authorError, hasLeadAssets, slug }),
  ...generateQueries(iteration => {
    let itemIndex = (iteration - 1) * pageSize;
    let imageIndex = (iteration - 1) * pageSize;

    return {
      defaults: {
        types: {
          Article: () => {
            itemIndex += 1;
            return makeItem(
              item,
              itemIndex
            );
          },
          Crop: () => ({
            url: "https://placeimg.com/300/200/tech"
          }),
          Image: () => {
            imageIndex += 1;
            return {
              __typename: "Image",
              id: `e98c2$c-cb16-11e7-b529-95e3fc05f40f`,
              title: `Some title ${imageIndex}`
            };
          },
          Media: () => ({
            __typename: "Image"
          }),
          UUID: () => "a-u-u-i-d"
        }//,
        // values: {
        //   author: () => ({
        //     articles: {
        //       count,

        //       list(_, { first }) {
        //         return new MockList(Math.min(count, first));
        //       }
        //     }
        //   })
        // }
      },
      error: articleError(),
      query: authorArticlesWithImages,
      variables: iteration => ({
        first: pageSize,
        longSummaryLength: 360,
        shortSummaryLength: 220,
        skip: (iteration - 1) * pageSize,
        slug
      })
    };
  }, count === 0 ? 1 : count / pageSize)
]};
