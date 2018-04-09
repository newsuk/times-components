import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query AuthorQuery($slug: Slug!) {
    author(slug: $slug) {
      name
      jobTitle
      biography
      image
      twitter
      hasLeadAssets
      articles {
        count
      }
    }
  }
`;

export default connectGraphql(query);
