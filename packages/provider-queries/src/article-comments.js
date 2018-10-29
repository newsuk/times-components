import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query ArticleCommentsQuery($id: ID!) {
    article(id: $id) {
      id
      commentCount
      commentsEnabled
    }
  }
`);
