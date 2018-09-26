import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query ArticleListQuery(
    $first: Int
    $imageRatio: Ratio!
    $skip: Int
    $slug: Slug!
  ) {
    author(slug: $slug) {
      articles {
        count
        list(first: $first, skip: $skip) {
          hasVideo
          headline
          id
          label
          leadAsset {
            ... on Image {
              crop(ratio: $imageRatio) {
                url
              }
              title
            }
            ... on Video {
              posterImage {
                crop(ratio: $imageRatio) {
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
`);

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
