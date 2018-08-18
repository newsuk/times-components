export default `
  query ArticleListQuery(
    $first: Int
    $longSummaryLength: Int
    $shortSummaryLength: Int
    $skip: Int
    $slug: Slug!
  ) {
    author(slug: $slug) {
      __typename
      articles {
        __typename
        count
        list(first: $first, skip: $skip) {
          __typename
          id
          label
          leadAsset {
            type: __typename
          }
          longSummary: summary(maxCharCount: $longSummaryLength)
          publicationName
          publishedTime
          headline
          shortHeadline
          shortSummary: summary(maxCharCount: $shortSummaryLength)
          url
        }
      }
    }
  }
`;

export const propsToVariables = ({
  longSummaryLength,
  pageSize,
  page,
  shortSummaryLength,
  slug
}) => ({
  first: pageSize,
  longSummaryLength,
  shortSummaryLength,
  skip: pageSize * (page - 1),
  slug
});
