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
          contractualTitle: "Contractual Title"
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

export default ({
  articleError = () => {},
  articleQuery,
  articleVariables = () => {},
  authorError,
  count = 200,
  hasLeadAssets = true,
  makeItem = x => x,
  pageSize,
  slug
}) => [
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
              {
                hasVideo: false,
                headline: `Test Headline ${itemIndex}`,
                id: `d98c2${itemIndex
                  .toString()
                  .padStart(2)}c-cb16-11e7-b529-95e3fc05f40f`,
                label: `Test Label ${itemIndex}`,
                publicationName: "TIMES",
                publishedTime: "2018-06-01",
                shortHeadline: `Test Short Headline ${itemIndex}`,
                shortIdentifier: `968n7tdck${itemIndex}`,
                slug: `this-is-slug-${itemIndex}`,
                summary: [],
                url: "https://url.io"
              },
              itemIndex
            );
          },
          Crop: () => ({
            url:
              "https://times-static-assets.s3.eu-west-1.amazonaws.com/assets/tech_300_200.jpg"
          }),
          Image: () => {
            imageIndex += 1;
            return {
              __typename: "Image",
              id: `e98c2${imageIndex
                .toString()
                .padStart(2)}c-cb16-11e7-b529-95e3fc05f40f`,
              title: `Some title ${imageIndex}`
            };
          },
          Media: () => ({
            __typename: "Image"
          })
        },
        values: {
          author: () => ({
            articles: {
              count,

              list(_, { first }) {
                return new MockList(Math.min(count, first));
              }
            }
          })
        }
      },
      error: articleError(iteration),
      query: articleQuery,
      variables: articleVariables(iteration)
    };
  }, count === 0 ? 1 : count / pageSize)
];
