import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  mutation UnsaveBookmark($id: UUID!) {
    unsaveBookmarks(bookmarks: [{ id: $id }])
  }
`);
