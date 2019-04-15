import gql from "graphql-tag";

export default gql`
  fragment articleProps on Article {
    bylines {
      ... on Byline {
        byline
        image {
          id
          caption
          credits
          title
          crop(ratio: "1:1") {
            ratio
            url
          }
        }
      }
    }
    hasVideo
    headline
    id
    label
    publicationName
    publishedTime
    section
    shortHeadline
    shortIdentifier
    slug
    url
  }
`;
