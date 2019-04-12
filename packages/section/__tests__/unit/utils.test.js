import { mockPuzzleSlice } from "@times-components/fixture-generator";
import {
  splitPuzzlesBySlices,
  buildSliceData,
  getImage
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

describe("buildSliceData", () => {
  it("should create slice with elementId", () => {
    const slices = [{ id: "a", name: "sliceA" }, { id: "b", name: "sliceB" }];
    const withElementId = buildSliceData(slices);

    expect(withElementId[0].elementId).toBe("a.0");
    expect(withElementId[1].elementId).toBe("b.1");
  });

  it("should not change any other properties", () => {
    const slices = [{ id: "a", name: "sliceA" }, { id: "b", name: "sliceB" }];
    const withElementId = buildSliceData(slices);

    expect(withElementId[0].name).toBe(slices[0].name);
    expect(withElementId[1].name).toBe(slices[1].name);
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
