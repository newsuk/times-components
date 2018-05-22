import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query TopicQuery($slug: Slug!) {
    topic(slug: $slug) {
      name
      description
    }
  }
`;

export default connectGraphql(query);
