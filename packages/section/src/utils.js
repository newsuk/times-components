/* eslint-disable no-param-reassign */
import memoizeOne from "memoize-one";

const withIgnoredSeperator = slice => ({ ...slice, ignoreSeparator: true });

const shouldIgnoreSeperator = ({ name }) =>
  name === "LeadersSlice" || name === "DailyUniversalRegister";

const addSeparatorData = memoizeOne(data =>
  data.reduce((newSlices, slice, idx) => {
    const nextSlice = data[idx + 1];

    if (nextSlice && shouldIgnoreSeperator(nextSlice)) {
      newSlices[idx] = withIgnoredSeperator(slice);
      newSlices[idx + 1] = withIgnoredSeperator(nextSlice);
    } else if (!newSlices[idx]) {
      newSlices[idx] = slice;
    }

    return newSlices;
  }, [])
);

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

const buildSliceData = memoizeOne(slices =>
  addSeparatorData(
    slices.map((slice, index) => ({
      ...slice,
      elementId: `${slice.id}.${index}`
    }))
  )
);

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
