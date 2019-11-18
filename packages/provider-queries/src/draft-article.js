import { addTypenameToDocument } from "apollo-utilities";
import articleDraftWebQuery from "./draft_article.graphql";

export default addTypenameToDocument(articleDraftWebQuery);
