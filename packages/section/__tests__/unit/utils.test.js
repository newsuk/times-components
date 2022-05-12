import { mockPuzzleSlice } from "@times-components/fixture-generator";
import { editionBreakpoints } from "@times-components/ts-styleguide";
import {
  splitPuzzlesBySlices,
  buildSliceData,
  consecutiveItemsFlagger,
  getImage,
  filterPuzzles,
  createPuzzleData,
  composeSliceBuilders
} from "../../src/utils";

describe("splitPuzzlesBySlices", () => {
  it("should split 3 puzzles in only one slice", () => {
    const puzzles = new Array(3).fill(0).map(() => mockPuzzleSlice());
    const chunked = splitPuzzlesBySlices(puzzles);

    expect(chunked[0].puzzles.length).toBe(3);
    expect(chunked[1]).not.toBeDefined();
  });

  it("should split puzzles into chunks of 3 by default", () => {
    const puzzles = new Array(5).fill(0).map(() => mockPuzzleSlice());
    const chunked = splitPuzzlesBySlices(puzzles);

    expect(chunked[0].puzzles.length).toBe(3);
    expect(chunked[1].puzzles.length).toBe(2);
  });

  it("can split puzzles into chunks of any passed int", () => {
    const puzzles = new Array(5).fill(0).map(() => mockPuzzleSlice());
    const chunked = splitPuzzlesBySlices(puzzles, 4);

    expect(chunked[0].puzzles.length).toBe(4);
    expect(chunked[1].puzzles.length).toBe(1);
  });

  it("should return an empty array if puzzles are 0", () => {
    const puzzles = [];
    const chunked = splitPuzzlesBySlices(puzzles);

    expect(chunked.length).toBe(0);
  });
});

describe("composeSliceBuilders", () => {
  it("should invoke the two passed functions", () => {
    const builderOne = jest.fn();
    const builderTwo = jest.fn();
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "OtherSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "OtherSlice" },
      { id: "k", name: "OtherSlice" },
      { id: "l", name: "DailyUniversalRegister" }
    ];

    const buildData = composeSliceBuilders(builderOne, builderTwo);
    buildData(originalData);
    expect(builderOne).toHaveBeenCalled();
    expect(builderTwo).toHaveBeenCalled();
  });

  it("should invoke the second function with the result of the first being applied", () => {
    const builderOne = jest.fn();
    const builderTwo = jest.fn();
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "OtherSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "OtherSlice" },
      { id: "k", name: "OtherSlice" },
      { id: "l", name: "DailyUniversalRegister" }
    ];

    const buildData = composeSliceBuilders(builderOne, builderTwo);
    buildData(originalData);
    expect(builderTwo).toHaveBeenCalledWith(builderOne(originalData));
  });
});

describe("buildSliceData", () => {
  it("should add elementId and ignoreSeparator properties", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "OtherSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "OtherSlice" },
      { id: "k", name: "OtherSlice" },
      { id: "l", name: "DailyUniversalRegister" }
    ];
    const newData = buildSliceData(originalData);

    expect(newData).toMatchSnapshot();
  });

  it("should not mutate passed data", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "OtherSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "OtherSlice" },
      { id: "k", name: "OtherSlice" },
      { id: "l", name: "DailyUniversalRegister" }
    ];
    const json = JSON.stringify(originalData);
    buildSliceData(originalData);
    expect(JSON.stringify(originalData)).toEqual(json);
  });
});

describe("consecutiveItemsFlagger", () => {
  it("should not add any properties if there aren't any consecutive slices", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "SecondaryFourSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "SecondaryFourSlice" },
      { id: "k", name: "DailyUniversalRegister" },
      { id: "l", name: "SecondaryFourSlice" }
    ];

    const newData = consecutiveItemsFlagger(originalData);

    expect(newData).toEqual(originalData);
  });

  it("should add isConsecutive property on the second consecutive slice", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "SecondaryFourSlice" },
      { id: "g", name: "SecondaryFourSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "SecondaryFourSlice" },
      { id: "k", name: "DailyUniversalRegister" },
      { id: "l", name: "DailyUniversalRegister" }
    ];

    const flaggedData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "SecondaryFourSlice" },
      { isConsecutive: true, id: "g", name: "SecondaryFourSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "SecondaryFourSlice" },
      { id: "k", name: "DailyUniversalRegister" },
      { isConsecutive: true, id: "l", name: "DailyUniversalRegister" }
    ];

    const newData = consecutiveItemsFlagger(originalData);
    expect(newData).toMatchSnapshot();
    expect(newData).toEqual(flaggedData);
  });

  it("should not mutate passed data", () => {
    const originalData = [
      { id: "a", name: "LeadersSlice" },
      { id: "b", name: "DailyUniversalRegister" },
      { id: "c", name: "OtherSlice" },
      { id: "d", name: "LeadersSlice" },
      { id: "e", name: "DailyUniversalRegister" },
      { id: "f", name: "SecondaryFourSlice" },
      { id: "g", name: "OtherSlice" },
      { id: "h", name: "LeadersSlice" },
      { id: "i", name: "OtherSlice" },
      { id: "j", name: "SecondaryFourSlice" },
      { id: "k", name: "DailyUniversalRegister" },
      { id: "l", name: "SecondaryFourSlice" }
    ];
    const json = JSON.stringify(originalData);
    consecutiveItemsFlagger(originalData);
    expect(JSON.stringify(originalData)).toEqual(json);
  });
});

describe("getImage", () => {
  it("should return empty object when cover.crops is empty array", () => {
    expect(getImage({ crops: [] })).toEqual({});
  });
  it("should return empty object when cover.crops is undefined", () => {
    expect(getImage({})).toEqual({});
  });
  it("should return image and ratio", () => {
    const exampleUrl =
      "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9de951a0-5249-11e9-82c1-b5b0bbeb9bfd.jpg?crop=1050%2C1290%2C0%2C0";
    const cover = {
      crops: [
        {
          ratio: "35:43",
          url: exampleUrl
        }
      ],
      id: "dummy-cover-id"
    };

    expect(getImage(cover)).toEqual({
      ratio: 35 / 43,
      url: exampleUrl
    });
  });
});

describe("filterPuzzles", () => {
  it("should not filter the puzzles on small resolution and return the same collection", () => {
    const puzzles = new Array(7).fill(0).map(() => mockPuzzleSlice());
    const filteredPuzzles = filterPuzzles(puzzles, editionBreakpoints.small);

    expect(filteredPuzzles.length).toBe(7);
  });

  it("should not filter the puzzles on different resolution than small and return the same collection", () => {
    const puzzles = new Array(6).fill(0).map(() => mockPuzzleSlice());
    puzzles.push(mockPuzzleSlice(true));
    const filteredPuzzles = filterPuzzles(puzzles, editionBreakpoints.wide);

    expect(filteredPuzzles.length).toBe(7);
  });

  it("should filter the puzzles and return array with 6 elements", () => {
    const puzzles = new Array(6).fill(0).map(() => mockPuzzleSlice());
    puzzles.push(mockPuzzleSlice(true));
    const filteredPuzzles = filterPuzzles(puzzles, editionBreakpoints.small);

    expect(filteredPuzzles.length).toBe(6);
  });

  it("should return an empty array if puzzles are is empty", () => {
    const puzzles = [];
    const filteredPuzzles = filterPuzzles(puzzles, editionBreakpoints.small);

    expect(filteredPuzzles.length).toBe(0);
  });
});

describe("createPuzzleData", () => {
  it("should create puzzle data and return 3 rows of puzzles", () => {
    const puzzles = new Array(7).fill(0).map(() => mockPuzzleSlice());
    const data = createPuzzleData(puzzles, editionBreakpoints.small);

    expect(data).toMatchSnapshot();
  });

  it("should create puzzle data and return 2 rows of puzzles", () => {
    const puzzles = new Array(6).fill(0).map(() => mockPuzzleSlice());
    puzzles.push(mockPuzzleSlice(true));
    const data = createPuzzleData(puzzles, editionBreakpoints.small);

    expect(data).toMatchSnapshot();
  });

  it("should create puzzle data and return 3 rows of puzzles on resolution different than small ", () => {
    const puzzles = new Array(6).fill(0).map(() => mockPuzzleSlice());
    puzzles.push(mockPuzzleSlice(true));
    const data = createPuzzleData(puzzles, editionBreakpoints.wide);

    expect(data).toMatchSnapshot();
  });
});
