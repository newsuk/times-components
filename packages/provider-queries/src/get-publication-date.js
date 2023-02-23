import { addTypenameToDocument } from "apollo-utilities";
import getPublicationDate from "./get_publication_date.graphql";

export default addTypenameToDocument(getPublicationDate);