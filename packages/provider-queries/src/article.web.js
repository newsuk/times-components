import { addTypenameToDocument } from "apollo-utilities";
import articleWebQuery from "./article_web.graphql";

export default addTypenameToDocument(articleWebQuery);
