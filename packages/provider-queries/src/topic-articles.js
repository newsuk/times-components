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
          hasVideo
          headline
          id
          label
          slug
          shortIdentifier
          leadAsset {
            ... on Image {
              crop(ratio: $imageRatio) {
                url
              }
              id
              title
            }
            ... on Video {
              posterImage {
                crop(ratio: $imageRatio) {
                  url
                }
                id
                title
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
