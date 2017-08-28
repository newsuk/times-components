import gql from "graphql-tag";

export default gql`
  query ArticleQuery(
    $slug: Slug!
    $first: Int
    $skip: Int
    $imageRatio: Ratio!
  ) {
    author(slug: $slug) {
      name
      jobTitle
      biography
      image
      twitter
      url
      articles {
        count
        list(first: $first, skip: $skip) {
          id
          title
          label
          publicationName
          publishedTime
          leadAsset {
            ... on Image {
              title
              crop(ratio: $imageRatio) {
                url
              }
            }
            ... on Video {
              posterImage {
                title
                crop(ratio: $imageRatio) {
                  url
                }
              }
            }
          }
          teaser
        }
      }
    }
  }
`;
