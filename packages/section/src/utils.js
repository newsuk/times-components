const splitPuzzlesBySlices = (puzzles, numberOfTilesPerSlice = 3) =>
  puzzles.reduce((result, puzzle, index) => {
    const slices = result;
    const sliceIndex = Math.floor(index / numberOfTilesPerSlice);
    const { id, name } = puzzle;

    slices[sliceIndex] = slices[sliceIndex] || { id, name };
    slices[sliceIndex].puzzles = [
      ...(slices[sliceIndex].puzzles || []),
      puzzle
    ];

    return slices;
  }, []);

const buildSliceData = slices =>
  slices.map((slice, index) => ({
    ...slice,
    elementId: `${slice.id}.${index}`
  }));

export { splitPuzzlesBySlices, buildSliceData };
