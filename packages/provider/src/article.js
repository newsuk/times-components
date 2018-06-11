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
          brightcovePolicyKey
          brightcoveVideoId
          brightcoveAccountId
          type: __typename
          posterImage {
            ...imageProps
          }
          brightcoveAccountId
          brightcoveVideoId
          brightcovePolicyKey
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
        summary125: summary(maxCharCount: 125)
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
      topics {
        name
        slug
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
