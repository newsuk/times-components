/* eslint-disable no-param-reassign */
import memoizeOne from "memoize-one";
import { editionBreakpoints } from "@times-components/styleguide";

const withIgnoredSeperator = slice => ({ ...slice, ignoreSeparator: true });

const shouldIgnoreSeperator = ({ name }) =>
  name === "LeadersSlice" || name === "DailyUniversalRegister";

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

const buildSliceData = memoizeOne(data =>
  data.reduce((newSlices, oldSlice, idx) => {
    const nextSlice = data[idx + 1];

    if (nextSlice && shouldIgnoreSeperator(nextSlice)) {
      newSlices[idx] = withIgnoredSeperator(oldSlice);
      newSlices[idx + 1] = withIgnoredSeperator(nextSlice);
    } else if (!newSlices[idx]) {
      newSlices[idx] = oldSlice;
    }

    const currentSlice = newSlices[idx];

    newSlices[idx] = {
      ...currentSlice,
      elementId: `${currentSlice.id}.${idx}`
    };

    return newSlices;
  }, [])
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

const filterPuzzles = (puzzles, editionBreakpoint) =>
  editionBreakpoint === editionBreakpoints.small
    ? puzzles.filter(puzzle => !puzzle.hideOnMobile)
    : puzzles;

const createPuzzleData = (puzzles, editionBreakpoint) => {
  const filteredPuzzles = filterPuzzles(puzzles, editionBreakpoint);
  const splitedPuzzlesBySlices = splitPuzzlesBySlices(filteredPuzzles);
  const sliceData = buildSliceData(splitedPuzzlesBySlices);

  return sliceData;
};

export {
  buildSliceData,
  getImage,
  createPuzzleData,
  splitPuzzlesBySlices,
  filterPuzzles
};
