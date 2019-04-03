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

const getRatio = ratio => {
  const ratios = ratio.split(":").map(num => parseInt(num, 10));

  return ratios[0] / ratios[1];
};

const getImage = ({ crops = [] }) => {
  if (crops.length === 0) {
    return {};
  }

  return {
    ratio: getRatio(crops[0].ratio),
    url: crops[0].url
  };
};

export { splitPuzzlesBySlices, buildSliceData, getImage };
