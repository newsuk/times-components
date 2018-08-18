export default `
  query AuthorQuery($slug: Slug!) {
    author(slug: $slug) {
      __typename
      articles {
        __typename
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
`;
