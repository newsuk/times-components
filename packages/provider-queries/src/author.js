import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query AuthorQuery($slug: Slug!) {
    author(slug: $slug) {
      articles {
        count
      }
      biography
      hasLeadAssets
      image
      jobTitle
      name
      twitter
    }
  }
`);
