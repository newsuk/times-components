import { addTypenameToDocument } from "apollo-utilities";
import getTokenisedArticleUrl from "./get_tokenised_article_url.graphql";

export default addTypenameToDocument(getTokenisedArticleUrl);
