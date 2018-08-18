export default `
  query TopicQuery($slug: Slug!) {
    topic(slug: $slug) {
      __typename
      name
      description
    }
  }
`;
