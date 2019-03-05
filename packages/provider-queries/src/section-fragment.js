import gql from "graphql-tag";

export default gql`
  fragment sectionPageProps on Section {
    id
    title
    colour {
      rgba {
        red
        green
        blue
        alpha
      }
    }
    ...standardSection
    ...magazineSection
    ...puzzleSection
  }

  fragment puzzleSection on PuzzleSection {
    name: __typename
    slices {
      name: __typename
      ... on Puzzle {
        id
        title
        url
        image {
          crop32: crop(ratio: "3:2") {
            ratio
            url
          }
        }
      }
    }
  }

  fragment standardSection on StandardSection {
    name: __typename
    slices {
      name: __typename
      ... on CommentLeadAndCartoonSlice {
        lead {
          headline
          strapline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            strapline
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
        cartoon {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
      }
      ... on LeadersSlice {
        leader1 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
          }
        }
        leader2 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
          }
        }
        leader3 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
          }
        }
      }
      ... on LeadOneAndFourSlice {
        lead {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support3 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support4 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
      }
      ... on LeadOneAndOneSlice {
        lead {
          headline
          leadAsset {
            ...leadAsset169and32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169and32
            }
            listingAsset {
              ...listingAsset169and32
            }
          }
        }
        support {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
      }
      ... on LeadOneFullWidthSlice {
        lead {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
      }
      ... on LeadTwoNoPicAndTwoSlice {
        lead1 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
            summary125: summary(maxCharCount: 125)
            summary300: summary(maxCharCount: 300)
          }
          teaser125: teaser(maxCharCount: 125)
          teaser300: teaser(maxCharCount: 300)
        }
        lead2 {
          headline
          article {
            ...baseArticleProps
            summary125: summary(maxCharCount: 125)
            summary300: summary(maxCharCount: 300)
          }
          teaser125: teaser(maxCharCount: 125)
          teaser300: teaser(maxCharCount: 300)
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset45
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset45
            }
            listingAsset {
              ...listingAsset45
            }
          }
        }
      }
      ... on SecondaryFourSlice {
        secondary1 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary2 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary3 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary4 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
      }
      ... on SecondaryOneSlice {
        secondary {
          headline
          leadAsset {
            ...leadAsset169and32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169and32
            }
            listingAsset {
              ...listingAsset169and32
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
      }
      ... on SecondaryOneAndColumnistSlice {
        secondary {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        columnist {
          headline
          leadAsset {
            ...leadAsset23
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset23
            }
            listingAsset {
              ...listingAsset23
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
      }
      ... on SecondaryOneAndFourSlice {
        secondary {
          headline
          strapline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            strapline
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
        support1 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support2 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support3 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support4 {
          headline
          article {
            ...baseArticleProps
          }
        }
      }
      ... on SecondaryTwoAndTwoSlice {
        secondary1 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary2 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
      }
      ... on SecondaryTwoNoPicAndTwoSlice {
        secondary1 {
          headline
          article {
            ...baseArticleProps
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
        secondary2 {
          headline
          article {
            ...baseArticleProps
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
      }
      ... on TwoPicAndSixNoPicSlice {
        lead1 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        lead2 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        support1 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support2 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support3 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support4 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support5 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support6 {
          headline
          article {
            ...baseArticleProps
          }
        }
      }
      ... on DailyUniversalRegister {
        briefing {
          ...durItem
        }
        onThisDay {
          ...durItem
        }
        natureNotes {
          ...durItem
        }
        birthdaysToday {
          ...durItem
        }
      }
    }
  }

  fragment magazineSection on MagazineSection {
    name: __typename
    slices {
      name: __typename
      ... on CommentLeadAndCartoonSlice {
        lead {
          headline
          strapline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            strapline
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
        cartoon {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
      }
      ... on LeadersSlice {
        leader1 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
          }
        }
        leader2 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
          }
        }
        leader3 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
          }
        }
      }
      ... on LeadOneAndFourSlice {
        lead {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support3 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support4 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
      }
      ... on LeadOneAndOneSlice {
        lead {
          headline
          leadAsset {
            ...leadAsset169and32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169and32
            }
            listingAsset {
              ...listingAsset169and32
            }
          }
        }
        support {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
      }
      ... on LeadOneFullWidthSlice {
        lead {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
      }
      ... on LeadTwoNoPicAndTwoSlice {
        lead1 {
          headline
          strapline
          article {
            ...baseArticleProps
            strapline
            summary125: summary(maxCharCount: 125)
            summary300: summary(maxCharCount: 300)
          }
          teaser125: teaser(maxCharCount: 125)
          teaser300: teaser(maxCharCount: 300)
        }
        lead2 {
          headline
          article {
            ...baseArticleProps
            summary125: summary(maxCharCount: 125)
            summary300: summary(maxCharCount: 300)
          }
          teaser125: teaser(maxCharCount: 125)
          teaser300: teaser(maxCharCount: 300)
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset32
            }
            listingAsset {
              ...listingAsset32
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset45
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset45
            }
            listingAsset {
              ...listingAsset45
            }
          }
        }
      }
      ... on SecondaryFourSlice {
        secondary1 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary2 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary3 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary4 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
      }
      ... on SecondaryOneSlice {
        secondary {
          headline
          leadAsset {
            ...leadAsset169and32
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169and32
            }
            listingAsset {
              ...listingAsset169and32
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
      }
      ... on SecondaryOneAndColumnistSlice {
        secondary {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        columnist {
          headline
          leadAsset {
            ...leadAsset23
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset23
            }
            listingAsset {
              ...listingAsset23
            }
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
      }
      ... on SecondaryOneAndFourSlice {
        secondary {
          headline
          strapline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            strapline
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
        support1 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support2 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support3 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support4 {
          headline
          article {
            ...baseArticleProps
          }
        }
      }
      ... on SecondaryTwoAndTwoSlice {
        secondary1 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        secondary2 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
      }
      ... on SecondaryTwoNoPicAndTwoSlice {
        secondary1 {
          headline
          article {
            ...baseArticleProps
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
        secondary2 {
          headline
          article {
            ...baseArticleProps
            summary125: summary(maxCharCount: 125)
          }
          teaser125: teaser(maxCharCount: 125)
        }
        support1 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
        support2 {
          headline
          leadAsset {
            ...leadAsset11
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset11
            }
            listingAsset {
              ...listingAsset11
            }
          }
        }
      }
      ... on TwoPicAndSixNoPicSlice {
        lead1 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        lead2 {
          headline
          leadAsset {
            ...leadAsset169
          }
          article {
            ...baseArticleProps
            leadAsset {
              ...leadAsset169
            }
            listingAsset {
              ...listingAsset169
            }
          }
        }
        support1 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support2 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support3 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support4 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support5 {
          headline
          article {
            ...baseArticleProps
          }
        }
        support6 {
          headline
          article {
            ...baseArticleProps
          }
        }
      }
    }
  }

  fragment durItem on DailyUniversalRegisterItem {
    title
    byline
    content
  }

  fragment baseArticleProps on Article {
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
    expirableFlags {
      type
      expiryTime
    }
    hasVideo
    headline
    id
    label
    shortHeadline
    url
  }

  fragment leadAsset169 on Media {
    __typename
    ... on Video {
      posterImage {
        crop169: crop(ratio: "16:9") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop169: crop(ratio: "16:9") {
        ratio
        url
      }
    }
  }

  fragment listingAsset32 on Media {
    __typename
    ... on Video {
      posterImage {
        crop32: crop(ratio: "3:2") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop32: crop(ratio: "3:2") {
        ratio
        url
      }
    }
  }

  fragment listingAsset11 on Media {
    __typename
    ... on Video {
      posterImage {
        crop11: crop(ratio: "1:1") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop11: crop(ratio: "1:1") {
        ratio
        url
      }
    }
  }

  fragment listingAsset45 on Media {
    __typename
    ... on Video {
      posterImage {
        crop45: crop(ratio: "4:5") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop45: crop(ratio: "4:5") {
        ratio
        url
      }
    }
  }

  fragment listingAsset23 on Media {
    __typename
    ... on Video {
      posterImage {
        crop23: crop(ratio: "2:3") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop23: crop(ratio: "2:3") {
        ratio
        url
      }
    }
  }

  fragment listingAsset169and32 on Media {
    __typename
    ... on Video {
      posterImage {
        crop32: crop(ratio: "3:2") {
          ratio
          url
        }
        crop169: crop(ratio: "16:9") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop32: crop(ratio: "3:2") {
        ratio
        url
      }
      crop169: crop(ratio: "16:9") {
        ratio
        url
      }
    }
  }

  fragment leadAsset32 on Media {
    __typename
    ... on Video {
      posterImage {
        crop32: crop(ratio: "3:2") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop32: crop(ratio: "3:2") {
        ratio
        url
      }
    }
  }

  fragment leadAsset11 on Media {
    __typename
    ... on Video {
      posterImage {
        crop11: crop(ratio: "1:1") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop11: crop(ratio: "1:1") {
        ratio
        url
      }
    }
  }

  fragment leadAsset45 on Media {
    __typename
    ... on Video {
      posterImage {
        crop45: crop(ratio: "4:5") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop45: crop(ratio: "4:5") {
        ratio
        url
      }
    }
  }

  fragment leadAsset23 on Media {
    __typename
    ... on Video {
      posterImage {
        crop23: crop(ratio: "2:3") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop23: crop(ratio: "2:3") {
        ratio
        url
      }
    }
  }

  fragment listingAsset169 on Media {
    __typename
    ... on Video {
      posterImage {
        crop169: crop(ratio: "16:9") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop169: crop(ratio: "16:9") {
        ratio
        url
      }
    }
  }

  fragment leadAsset169and32 on Media {
    __typename
    ... on Video {
      posterImage {
        crop32: crop(ratio: "3:2") {
          ratio
          url
        }
        crop169: crop(ratio: "16:9") {
          ratio
          url
        }
      }
    }
    ... on Image {
      crop32: crop(ratio: "3:2") {
        ratio
        url
      }
      crop169: crop(ratio: "16:9") {
        ratio
        url
      }
    }
  }
`;
