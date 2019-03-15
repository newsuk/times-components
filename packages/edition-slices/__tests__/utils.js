import { mockPuzzleSlice } from "@times-components/fixture-generator";

const getPuzzleSlice = count => {
  const puzzles = new Array(count)
    .fill(0)
    .map((_, index) => ({ ...mockPuzzleSlice(), id: `${index}` }));
  return { puzzles };
};

export default getPuzzleSlice;
