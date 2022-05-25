import { addTypenameToDocument } from "apollo-utilities";
import recommendations from "./recommended_articles.graphql";

export default addTypenameToDocument(recommendations);
