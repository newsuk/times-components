import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
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
  shortSummaryLength,
  longSummaryLength
}) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  shortSummaryLength,
  longSummaryLength
});

export default connectGraphql(query, propsToVariables);
