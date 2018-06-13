import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query TopicArticlesQuery(
    $slug: Slug!
    $first: Int
    $skip: Int
    $imageRatio: Ratio!
  ) {
    topic(slug: $slug) {
      articles {
        count
        list(first: $first, skip: $skip) {
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
