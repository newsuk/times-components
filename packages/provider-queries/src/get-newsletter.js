import { addTypenameToDocument } from "apollo-utilities";
import getNewsletter from "./get_newsletter.graphql";

export default addTypenameToDocument(getNewsletter);
