import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query ArticleListQuery(
    $first: Int
    $longSummaryLength: Int
    $shortSummaryLength: Int
    $skip: Int
    $slug: Slug!
  ) {
    author(slug: $slug) {
      articles {
        count
        list(first: $first, skip: $skip) {
          hasVideo
          id
          label
          slug
          shortIdentifier
          leadAsset {
            __typename
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
`);

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
