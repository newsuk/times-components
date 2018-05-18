import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query TopicQuery($slug: Slug!, $first: Int, $skip: Int, $imageRatio: Ratio!) {
    topic(slug: $slug) {
      articles(first: $first, skip: $skip) {
        count
        list {
          byline
          headline
          id
          label
          leadAsset {
            ... on Image {
              id
              title
              crop(ratio: $imageRatio) {
                url
              }
            }
            ... on Video {
              posterImage {
                title
                crop(ratio: $imageRatio) {
                  url
                }
              }
            }
          }
          section
          publicationName
          publishedTime
          summary(maxCharCount: 115)
          url
        }
      }
    }
  }
`;

const propsToVariables = ({
  slug,
  pageSize,
  page,
  articleImageRatio = "3:2"
}) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  imageRatio: articleImageRatio
});

export default connectGraphql(query, propsToVariables);
