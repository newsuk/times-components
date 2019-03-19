import gql from "graphql-tag";

export default gql`
  fragment articlePageProps on Article {
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
    backgroundColour {
      rgba {
        red
        green
        blue
        alpha
      }
    }
    content
    dropcapsDisabled
    expirableFlags {
      type
      expiryTime
    }
    keywords
    leadAsset {
      __typename
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
      __typename
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
    standfirst
    template
    textColour {
      rgba {
        red
        green
        blue
        alpha
      }
    }
    topics(maxCount: 5) {
      name
      slug
    }
    ...articleProps
  }

  fragment imageProps on Image {
    caption
    credits
    crop169: crop(ratio: "16:9") {
      ratio
      url
    }
    crop32: crop(ratio: "3:2") {
      ratio
      url
    }
    crop1251: crop(ratio: "1.25:1") {
      ratio
      url
    }
    crop11: crop(ratio: "1:1") {
      ratio
      url
    }
    crop45: crop(ratio: "4:5") {
      ratio
      url
    }
    crop23: crop(ratio: "2:3") {
      ratio
      url
    }
    crop2251: crop(ratio: "2.25:1") {
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
    shortHeadline
    shortIdentifier
    slug
    url
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
`;
