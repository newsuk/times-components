import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  mutation($id: UUID!) {
    unsaveBookmarks(bookmarks: [{ id: $id }])
  }
`);
