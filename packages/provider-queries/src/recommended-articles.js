import { addTypenameToDocument } from "apollo-utilities";
import recommendedArticles from "./recommended_articles.graphql";

export default addTypenameToDocument(recommendedArticles);
