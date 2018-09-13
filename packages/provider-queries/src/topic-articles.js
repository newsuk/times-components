import gql from "graphql-tag";

export default gql`
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
            type: __typename
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
          publicationName
          publishedTime
          section
          shortHeadline
          summary(maxCharCount: 115)
          url
        }
      }
    }
  }
`;

export const propsToVariables = ({
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
