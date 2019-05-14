import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  mutation SaveBookmark($id: UUID!) {
    saveBookmarks(bookmarks: [{ id: $id }]) {
      id
    }
  }
`);
