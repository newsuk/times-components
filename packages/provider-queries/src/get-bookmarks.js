import { addTypenameToDocument } from "apollo-utilities";
import getBookmarks from "./get_bookmarks.graphql";

export default addTypenameToDocument(getBookmarks);
