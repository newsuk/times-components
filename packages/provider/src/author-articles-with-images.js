import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query ArticleListQuery(
    $slug: Slug!
    $first: Int
    $skip: Int
    $imageRatio: Ratio!
  ) {
    author(slug: $slug) {
      articles {
        count
        list(first: $first, skip: $skip) {
          summary(maxCharCount: 145)
          id
          label
          leadAsset {
            type: __typename
            ... on Image {
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
          publicationName
          publishedTime
          headline
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
