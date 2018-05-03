import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql `
  query ArticleQuery($slug: String!, $first: Int, $skip: Int){
  topic(slug: $slug) {
    name
    description
      articles(first: $first, skip: skip) {
      count
      list {
        ...article
      }
    }
  }
}

fragment article on Article {
  byline
  content(maxCharCount: 115)
  flags
  headline
  id
  label
  commercialTags
  section
  leadAsset {
    ... on Video {
      id
    }
    ... on Image {
      id
    }
  }
  publicationName
  publishedTime
  updatedTime
  standfirst
  summary(maxCharCount: 115)
  url
}
`;

export default connectGraphql(query);
