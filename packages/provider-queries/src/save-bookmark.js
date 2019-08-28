import { addTypenameToDocument } from "apollo-utilities";
import saveBookmarks from "./save_bookmark.graphql";

export default addTypenameToDocument(saveBookmarks);
