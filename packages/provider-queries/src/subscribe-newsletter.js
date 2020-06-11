import { addTypenameToDocument } from "apollo-utilities";
import subscribeNewsletter from "./subscribe_newsletter.graphql";

export default addTypenameToDocument(subscribeNewsletter);
