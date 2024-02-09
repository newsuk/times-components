const GET_PUZZLE_SECTIONS = `
  query GetPuzzleSections {
    editions {
      list(first: 1, group: date, region: default) {
        id
        publishedTime
        date
        updatedTime
        sections {
          __typename
          id
          title
          slug
          ... on PuzzleSection {
            id
            title
            slug
            slices {
              ... on Puzzle {
                __typename
                id
                title
                url
                hideOnMobile
                type
                slug
                shortIdentifier
                image {
                  id
                  title
                  caption
                  credits
                  crops {
                    ratio
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GET_PUZZLE_SECTIONS;
