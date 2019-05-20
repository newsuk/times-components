import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

 export default addTypenameToDocument(gql`
  query GetTokenisedEmailUrl($id: ID!) {
    article(id: $id) {
      tokenisedUrl
    }
  }
`);