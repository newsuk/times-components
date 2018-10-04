import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";

export default addTypenameToDocument(gql`
  query ArticleQuery($id: ID!) {
    article(id: $id) {
      commentCount
      commentsEnabled
      content
      flags
      keywords
      leadAsset {
        ... on Video {
          brightcoveAccountId
          brightcovePolicyKey
          brightcoveVideoId
          posterImage {
            ...imageProps
          }
          skySports
        }
        ... on Image {
          ...imageProps
        }
      }
      relatedArticleSlice {
        ... on StandardSlice {
          items {
            article {
              ...relatedProps
            }
          }
        }
        ... on LeadOneAndTwoSlice {
          lead {
            article {
              ...relatedProps
            }
          }
          support1 {
            article {
              ...relatedProps
            }
          }
          support2 {
            article {
              ...relatedProps
            }
          }
        }
        ... on OpinionOneAndTwoSlice {
          opinion {
            article {
              ...relatedProps
            }
          }
          support1 {
            article {
              ...relatedProps
            }
          }
          support2 {
            article {
              ...relatedProps
            }
          }
        }
      }
      standfirst
      topics(maxCount: 5) {
        name
        slug
      }
      ...articleProps
    }
  }

  fragment imageProps on Image {
    caption
    credits
    crop(ratio: "16:9") {
      ratio
      url
    }
    id
    title
  }

  fragment articleProps on Article {
    byline
    hasVideo
    headline
    id
    label
    publicationName
    publishedTime
    section
    shortIdentifier
    slug
    url
  }

  fragment relatedProps on Article {
    leadAsset {
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

  fragment summaries on Article {
    summary105: summary(maxCharCount: 105)
    summary125: summary(maxCharCount: 125)
    summary145: summary(maxCharCount: 145)
    summary160: summary(maxCharCount: 160)
    summary175: summary(maxCharCount: 175)
    summary225: summary(maxCharCount: 225)
  }
`);
