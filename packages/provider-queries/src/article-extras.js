import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import articleExtras from './article_extras.graphql';

export default addTypenameToDocument(articleExtras);
