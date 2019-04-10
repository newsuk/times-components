import gql from "graphql-tag";
import articleProps from "./article-props";

export default gql`
  fragment articlePageProps on Article {
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

  ${articleProps}
`;
