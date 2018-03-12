import gql from "graphql-tag";
import connectGraphql from "./connect";

export const query = gql`
  query ArticleQuery($id: ID!) {
    article(id: $id) {
      id
      headline
      publicationName
      publishedTime
      label
      standfirst
      flags
      byline
      content
      leadAsset {
        ... on Video {
          type: __typename
          posterImage {
            ...imageProps
          }
        }
        ... on Image {
          type: __typename
          ...imageProps
        }
      }
      relatedArticles {
        id
        headline
        section
        byline
        label
        publicationName
        publishedTime
        summary100: summary(maxCharCount: 100)
        summary110: summary(maxCharCount: 110)
        summary125: summary(maxCharCount: 125)
        summary150: summary(maxCharCount: 150)
        summary180: summary(maxCharCount: 180)
        leadAsset {
          ... on Image {
            id
            title
            crop169: crop(ratio: "16:9") {
              url
            }
            crop32: crop(ratio: "3:2") {
              url
            }
          }
        }
        url
      }
      relatedArticlesLayout {
        ... on Default {
          template
        }
        ... on LeadAndTwo {
          template
          lead
        }
        ... on OpinionAndTwo {
          template
          opinion
        }
      }
    }
  }

  fragment imageProps on Image {
    id
    title
    credits
    caption
    crop(ratio: "16:9") {
      ratio
      url
    }
  }
`;

export default connectGraphql(query);
