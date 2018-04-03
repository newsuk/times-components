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
      section
      url
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
        summary105: summary(maxCharCount: 105)
        summary125: summary(maxCharCount: 125)
        summary145: summary(maxCharCount: 145)
        summary160: summary(maxCharCount: 160)
        summary175: summary(maxCharCount: 175)
        summary225: summary(maxCharCount: 225)
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
        template
        ... on LeadAndTwo {
          main
        }
        ... on OpinionAndTwo {
          main
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
