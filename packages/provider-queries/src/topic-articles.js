export default `
  query TopicArticlesQuery(
    $first: Int
    $imageRatio: Ratio!
    $skip: Int
    $slug: Slug!
  ) {
    topic(slug: $slug) {
      __typename
      articles {
        __typename
        count
        list(first: $first, skip: $skip) {
          __typename
          byline
          headline
          id
          label
          leadAsset {
            __typename
            ... on Image {
              __typename
              id
              title
              crop(ratio: $imageRatio) {
                __typename
                url
              }
            }
            ... on Video {
              __typename
              posterImage {
                __typename
                title
                crop(ratio: $imageRatio) {
                  __typename
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
  articleImageRatio = "3:2",
  page,
  pageSize,
  slug
}) => ({
  first: pageSize,
  imageRatio: articleImageRatio,
  skip: pageSize * (page - 1),
  slug
});
