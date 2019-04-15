import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import articleProps from "./article-props";

export default addTypenameToDocument(
  gql`
    query ArticleExtrasQuery($id: ID!) {
      article(id: $id) {
        id
        commentCount
        commentsEnabled

        relatedArticleSlice {
          sliceName: __typename
          ... on StandardSlice {
            items {
              ...relatedProps
            }
          }
          ... on LeadOneAndTwoSlice {
            lead {
              ...relatedProps
            }
            support1 {
              ...relatedProps
            }
            support2 {
              ...relatedProps
            }
          }
          ... on OpinionOneAndTwoSlice {
            opinion {
              ...relatedProps
            }
            support1 {
              ...relatedProps
            }
            support2 {
              ...relatedProps
            }
          }
        }
        topics(maxCount: 5) {
          name
          slug
        }
      }
    }

    fragment relatedProps on Tile {
      leadAsset {
        __typename
        ... on Image {
          crop169: crop(ratio: "16:9") {
            url
          }
          crop32: crop(ratio: "3:2") {
            url
          }
          id
          title
        }
        ... on Video {
          posterImage {
            crop169: crop(ratio: "16:9") {
              url
            }
            crop32: crop(ratio: "3:2") {
              url
            }
            id
            title
          }
        }
      }
      article {
        leadAsset {
          __typename
          ... on Image {
            crop169: crop(ratio: "16:9") {
              url
            }
            crop32: crop(ratio: "3:2") {
              url
            }
            id
            title
          }
          ... on Video {
            posterImage {
              crop169: crop(ratio: "16:9") {
                url
              }
              crop32: crop(ratio: "3:2") {
                url
              }
              id
              title
            }
          }
        }
        ...articleProps
        ...summaries
      }
    }

    fragment summaries on Article {
      summary125: summary(maxCharCount: 125)
    }

    ${articleProps}
  `
);
