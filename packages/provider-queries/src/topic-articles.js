import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query TopicArticlesQuery(
    $first: Int
    $imageRatio: Ratio!
    $skip: Int
    $slug: Slug!
  ) {
    topic(slug: $slug) {
      articles {
        count
        list(first: $first, skip: $skip) {
          byline
          headline
          id
          label
          leadAsset {
            ... on Image {
              id
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
          publicationName
          publishedTime
          section
          shortHeadline
          summary(maxCharCount: 115)
          url
        }
      }
    }
  }
`);

export const propsToVariables = ({
  articleImageRatio = "3:2",
  page,
  pageSize,
  slug
}) => ({
  first: pageSize,
  imageRatio: articleImageRatio,
  skip: pageSize * (page - 1),
  slug
});
