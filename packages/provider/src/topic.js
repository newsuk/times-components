import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql `
 query TopicQuery($slug: Slug!, $first: Int, $skip: Int){
  topic(slug: $slug) {
    name
    description
    articles(first: $first, skip: $skip) {
    count
    list {
      byline
      id
      label
      section
      publicationName
      publishedTime
      summary(maxCharCount: 115)
      url
      __typename
    }
  }
  }
}
`;

export default connectGraphql(query);
