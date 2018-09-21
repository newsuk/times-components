import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query TopicQuery($slug: Slug!) {
    topic(slug: $slug) {
      name
      description
    }
  }
`);
