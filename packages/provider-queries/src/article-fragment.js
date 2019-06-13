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
    savingEnabled
    sharingEnabled
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
      ...cropProps
    }
    crop32: crop(ratio: "3:2") {
      ...cropProps
    }
    crop1251: crop(ratio: "1.25:1") {
      ...cropProps
    }
    crop11: crop(ratio: "1:1") {
      ...cropProps
    }
    crop45: crop(ratio: "4:5") {
      ...cropProps
    }
    crop23: crop(ratio: "2:3") {
      ...cropProps
    }
    crop2251: crop(ratio: "2.25:1") {
      ...cropProps
    }
    id
    title
  }

  fragment cropProps on Crop {
    ratio
    relativeHorizontalOffset
    relativeVerticalOffset
    relativeWidth
    relativeHeight
    url
  }

  ${articleProps}
`;
