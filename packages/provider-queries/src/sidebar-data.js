const GET_PUZZLE_SECTIONS = `
  query GetPuzzlesByType($puzzleStartDate: ShortDate!, $puzzleEndDate: ShortDate!, $type: String!) {
    puzzles(dateSince: $puzzleStartDate, dateBefore: $puzzleEndDate, type: $type){
      list(first:1){
        shortIdentifier
        slug
      }
    }
  }
`;

export default GET_PUZZLE_SECTIONS;
