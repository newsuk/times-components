const GET_PUZZLE_SECTIONS = `
  query GetPuzzlesByType($type: String!) {
    puzzles(type: $type){
      list(first:1){
        shortIdentifier
        slug
      }
    }
  }
`;

export default GET_PUZZLE_SECTIONS;
