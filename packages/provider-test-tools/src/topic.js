import { MockList } from "graphql-tools";
import {
  topic as topicQuery,
  topicArticles as articleQuery
} from "@times-components/provider-queries";
import generateQueries from "./generate-queries";

const description = [
  {
    name: "text",
    attributes: {
      value: "Chelsea is known for its "
    },
    children: []
  },
  {
    name: "italic",
    attributes: {},
    children: [
      {
        name: "text",
        attributes: {
          value: "affluent"
        },
        children: []
      }
    ]
  },
  {
    name: "text",
    attributes: {
      value:
        " residents and the posh shops and restaurants that cater to them. It’s a cultural haven too, with the Royal Court Theatre on Sloane Square and the modern Saatchi Gallery on the Duke of York Square. Close by, busy King’s Road is lined with mid- to high-end stores."
    },
    children: []
  }
];

const generateTopic = ({ delay, error, name, slug }) => {
  const query = {
    defaults: {
      values: {
        topic: () => ({
          __typename: "Topic",
          description,
          name
        })
      }
    },
    delay,
    query: topicQuery,
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
  articleVariables = () => {},
  count = 200,
  delay = 0,
  topicError,
  makeItem = x => x,
  name,
  pageSize,
  slug
}) => [
  ...generateTopic({ delay, error: topicError, name, slug }),
  ...generateQueries(iteration => {
    let itemIndex = (iteration - 1) * pageSize;
    let imageIndex = (iteration - 1) * pageSize;

    return {
      error: articleError(iteration),
      defaults: {
        values: {
          topic: () => ({
            articles: {
              count,
              list(_, { first }) {
                return new MockList(Math.min(count, first));
              }
            }
          })
        },
        types: {
          Article: () => {
            itemIndex += 1;

            return makeItem(
              {
                byline: [],
                headline: `Test Headline ${itemIndex}`,
                id: `d98c2${itemIndex
                  .toString()
                  .padStart(2)}c-cb16-11e7-b529-95e3fc05f40f`,
                label: `Test Label ${itemIndex}`,
                publicationName: "TIMES",
                publishedTime: "2018-06-01",
                shortHeadline: `Test Short Headline ${itemIndex}`,
                summary: [],
                url: "https://url.io"
              },
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
              id: `e98c2${imageIndex
                .toString()
                .padStart(2)}c-cb16-11e7-b529-95e3fc05f40f`,
              title: `Some title ${imageIndex}`
            };
          },
          Media: () => ({
            __typename: "Image"
          }),
          SectionName: () => "bricksmortar"
        }
      },
      delay,
      query: articleQuery,
      variables: articleVariables(iteration)
    };
  }, count === 0 ? 1 : count / pageSize)
];
