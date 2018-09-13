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
          headline
          id
          label
          leadAsset {
            type: __typename
          }
          longSummary: summary(maxCharCount: $longSummaryLength)
          publicationName
          publishedTime
          shortHeadline
          shortSummary: summary(maxCharCount: $shortSummaryLength)
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
