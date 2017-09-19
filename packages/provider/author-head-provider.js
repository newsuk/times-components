import gql from "graphql-tag";
import connect from "./connect";

const query = gql`
  query Author($slug: Slug!) {
    author(slug: $slug) {
      name
      jobTitle
      biography
      image
      twitter
    }
  }
`;

export default connect(query);
