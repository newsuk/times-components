import gql from "graphql-tag";

export default gql`
  query ArticleListQuery(
    $slug: Slug!
    $first: Int
    $skip: Int
    $shortSummaryLength: Int
    $longSummaryLength: Int
  ) {
    author(slug: $slug) {
      articles {
        count
        list(first: $first, skip: $skip) {
          shortSummary: summary(maxCharCount: $shortSummaryLength)
          longSummary: summary(maxCharCount: $longSummaryLength)
          id
          label
          leadAsset {
            type: __typename
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

export const propsToVariables = ({
  slug,
  pageSize,
  page,
  shortSummaryLength,
  longSummaryLength
}) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  shortSummaryLength,
  longSummaryLength
});
