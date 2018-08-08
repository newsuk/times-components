import gql from "graphql-tag";

export default gql`
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
