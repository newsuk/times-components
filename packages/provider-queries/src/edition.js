import { addTypenameToDocument } from "apollo-utilities";
import gql from "graphql-tag";
import articleFragment from "./article-fragment";

export default addTypenameToDocument(
  gql`
    query EditionQuery($id: ID!) {
      edition(id: $id) {
        id
        publishedTime
        updateText
        sections {
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
      }
    }

    fragment magazineSection on MagazineSection {
      __typename
      slices {
        ... on StandardSlice {
          __typename
          items {
            ...tile
          }
        }
        ... on CommentLeadAndCartoonSlice {
          __typename
          lead {
            ...tile
          }
          cartoon {
            ...tile
          }
        }
        ... on LetterThundererPodcastSlice {
          __typename
          letter {
            ...tile
          }
          thunderer {
            ...tile
          }
          podcast {
            ...tile
          }
        }
        ... on CommentTwoAndNotebookSlice {
          __typename
          main1 {
            ...tile
          }
          main2 {
            ...tile
          }
          notebook {
            ...tile
          }
        }
        ... on FocusSlice {
          __typename
          main {
            ...tile
          }
        }
        ... on LeadersSlice {
          __typename
          leader1 {
            ...tile
          }
          leader2 {
            ...tile
          }
          leader3 {
            ...tile
          }
        }
        ... on LeadOneAndFourSlice {
          __typename
          lead {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
          support3 {
            ...tile
          }
          support4 {
            ...tile
          }
        }
        ... on LeadOneAndOneSlice {
          __typename
          lead {
            ...tile
          }
          support {
            ...tile
          }
        }
        ... on LeadOneAndTwoSlice {
          __typename
          lead {
            ...tile
          }
          support1 {
            ...tile
          }
          support1 {
            ...tile
          }
        }
        ... on LeadOneFullWidthSlice {
          __typename
          lead {
            ...tile
          }
        }
        ... on LeadOneNoPicAndOneAndPortraitSlice {
          __typename
          lead {
            ...tile
          }
          support {
            ...tile
          }
          portrait {
            ...tile
          }
        }
        ... on LeadTwoNoPicAndTwoSlice {
          __typename
          lead1 {
            ...tile
          }
          lead2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on ObituariesLeadAndTwoSlice {
          __typename
          lead {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on OpinionOneAndTwoSlice {
          __typename
          opinion {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on SecondaryFourSlice {
          __typename
          secondary1 {
            ...tile
          }
          secondary2 {
            ...tile
          }
          secondary3 {
            ...tile
          }
          secondary4 {
            ...tile
          }
        }
        ... on SecondaryOneSlice {
          __typename
          secondary {
            ...tile
          }
        }
        ... on SecondaryOneAndColumnistSlice {
          __typename
          secondary {
            ...tile
          }
          columnist {
            ...tile
          }
        }
        ... on SecondaryOneAndFourSlice {
          __typename
          secondary {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            article {
              id
            }
          }
          support3 {
            ...tile
          }
          support4 {
            ...tile
          }
        }
        ... on SecondaryTwoAndTwoSlice {
          __typename
          secondary1 {
            ...tile
          }
          secondary2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on SecondaryTwoNoPicAndTwoSlice {
          __typename
          secondary1 {
            ...tile
          }
          secondary2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on TwoPicAndSixNoPicSlice {
          __typename
          lead1 {
            ...tile
          }
          lead2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
          support3 {
            ...tile
          }
          support4 {
            ...tile
          }
          support5 {
            ...tile
          }
          support6 {
            ...tile
          }
        }
      }
    }

    fragment puzzleSection on PuzzleSection {
      __typename
      slices {
        ... on Puzzle {
          __typename
          id
          title
          url
          image {
            crop(ratio: "16:9") {
              ratio
              url
            }
          }
        }
      }
    }

    fragment standardSection on StandardSection {
      __typename
      slices {
        ... on StandardSlice {
          __typename
          items {
            ...tile
          }
        }
        ... on CommentLeadAndCartoonSlice {
          __typename
          lead {
            ...tile
          }
          cartoon {
            ...tile
          }
        }
        ... on LetterThundererPodcastSlice {
          __typename
          letter {
            ...tile
          }
          thunderer {
            ...tile
          }
          podcast {
            ...tile
          }
        }
        ... on CommentTwoAndNotebookSlice {
          __typename
          main1 {
            ...tile
          }
          main2 {
            ...tile
          }
          notebook {
            ...tile
          }
        }
        ... on FocusSlice {
          __typename
          main {
            ...tile
          }
        }
        ... on LeadersSlice {
          __typename
          leader1 {
            ...tile
          }
          leader2 {
            ...tile
          }
          leader3 {
            ...tile
          }
        }
        ... on LeadOneAndFourSlice {
          __typename
          lead {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
          support3 {
            ...tile
          }
          support4 {
            ...tile
          }
        }
        ... on LeadOneAndOneSlice {
          __typename
          lead {
            ...tile
          }
          support {
            ...tile
          }
        }
        ... on LeadOneAndTwoSlice {
          __typename
          lead {
            ...tile
          }
          support1 {
            ...tile
          }
          support1 {
            ...tile
          }
        }
        ... on LeadOneFullWidthSlice {
          __typename
          lead {
            ...tile
          }
        }
        ... on LeadOneNoPicAndOneAndPortraitSlice {
          __typename
          lead {
            ...tile
          }
          support {
            ...tile
          }
          portrait {
            ...tile
          }
        }
        ... on LeadTwoNoPicAndTwoSlice {
          __typename
          lead1 {
            ...tile
          }
          lead2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on ObituariesLeadAndTwoSlice {
          __typename
          lead {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on OpinionOneAndTwoSlice {
          __typename
          opinion {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on SecondaryFourSlice {
          __typename
          secondary1 {
            ...tile
          }
          secondary2 {
            ...tile
          }
          secondary3 {
            ...tile
          }
          secondary4 {
            ...tile
          }
        }
        ... on SecondaryOneSlice {
          __typename
          secondary {
            ...tile
          }
        }
        ... on SecondaryOneAndColumnistSlice {
          __typename
          secondary {
            ...tile
          }
          columnist {
            ...tile
          }
        }
        ... on SecondaryOneAndFourSlice {
          __typename
          secondary {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            article {
              id
            }
          }
          support3 {
            ...tile
          }
          support4 {
            ...tile
          }
        }
        ... on SecondaryTwoAndTwoSlice {
          __typename
          secondary1 {
            ...tile
          }
          secondary2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on SecondaryTwoNoPicAndTwoSlice {
          __typename
          secondary1 {
            ...tile
          }
          secondary2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
        }
        ... on TwoPicAndSixNoPicSlice {
          __typename
          lead1 {
            ...tile
          }
          lead2 {
            ...tile
          }
          support1 {
            ...tile
          }
          support2 {
            ...tile
          }
          support3 {
            ...tile
          }
          support4 {
            ...tile
          }
          support5 {
            ...tile
          }
          support6 {
            ...tile
          }
        }
        ... on DailyUniversalRegister {
          __typename
          briefing {
            ...durItem
          }
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

    fragment durItem on DailyUniversalRegisterItem {
      title
      byline
      content
    }

    fragment tile on Tile {
      article {
        ...article
      }
    }

    ${articleFragment}
  `
);
