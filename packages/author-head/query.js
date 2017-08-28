import gql from "graphql-tag";

export default gql`
  query ArticleQuery($slug: Slug!) {
    author(slug: $slug) {
      name
      jobTitle
      biography
      image
      twitter
    }
  }
`;
