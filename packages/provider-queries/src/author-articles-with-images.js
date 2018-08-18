export default `
  query ArticleListQuery(    
    $first: Int
    $imageRatio: Ratio!
    $skip: Int
    $slug: Slug!
  ) {
    author(slug: $slug) {
      __typename
      articles {
        __typename
        count
        list(first: $first, skip: $skip) {
          __typename
          headline
          id
          label
          leadAsset {
            __typename
            ... on Image {
              __typename
              crop(ratio: $imageRatio) {
                __typename
                url
              }
              title
            }
            ... on Video {
              __typename
              posterImage {                
                crop(ratio: $imageRatio) {
                  __typename
                  url
                }
                title
              }
            }
          }
          publicationName
          publishedTime
          shortHeadline
          summary(maxCharCount: 145)          
          url
        }
      }
    }
  }
`;

export const propsToVariables = ({
  slug,
  pageSize,
  page,
  articleImageRatio = "3:2"
}) => ({
  first: pageSize,
  imageRatio: articleImageRatio,
  skip: pageSize * (page - 1),
  slug
});
