import gql from "graphql-tag";

export default gql`
  query TopicQuery($slug: Slug!) {
    topic(slug: $slug) {
      name
      description
    }
  }
`;
