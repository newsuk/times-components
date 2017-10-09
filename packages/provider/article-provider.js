import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query ArticleQuery($id: ID!) {
    article(id: $id) {
      id
      title
      publicationName
      publishedTime
      label
      standfirst
      flags
      byline
      content
      leadAsset {
        ... on Image {
          id
          title
          credits
          caption
          crop(ratio: "16:9") {
            ratio
            url
          }
        }
      }
    }
  }
`;

const propsToVariables = id => id;

export default connectGraphql(query, propsToVariables);
