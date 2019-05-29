import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query GetSavedBookamrks {
    viewer {
      bookmarks {
        bookmarks {
          id
        }
        total
      }
    }
  }
`);
