import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

 export default addTypenameToDocument(gql`
  query GetTokenisedEmailUrl($url: String!) {
    article(url: $url) {
      tokenisedUrl
    }
  }
`);