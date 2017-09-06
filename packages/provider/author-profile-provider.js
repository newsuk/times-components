import gql from "graphql-tag";
import connect from "./connect";

const query = gql`
  query Author($slug: Slug!, $first: Int, $skip: Int, $imageRatio: Ratio!) {
    author(slug: $slug) {
      articles {
        list(first: $first, skip: $skip) {
          content(maxCharCount: 145, markupType: "paragraph")
          id
          label
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
          publicationName
          publishedTime
          title
          url
        }
      }
    }
  }
`;

const propsToVariables = ({ slug, pageSize, page, imageRatio }) => ({
  slug,
  first: pageSize,
  skip: pageSize * (page - 1),
  imageRatio
});

export default connect(query, propsToVariables);
