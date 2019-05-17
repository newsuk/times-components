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
    expect(newData).toMatchInlineSnapshot(`
      Array [
        Object {
          "elementId": "a.0",
          "id": "a",
          "ignoreSeparator": true,
          "name": "LeadersSlice",
        },
        Object {
          "elementId": "b.1",
          "id": "b",
          "ignoreSeparator": true,
          "name": "DailyUniversalRegister",
        },
        Object {
          "elementId": "c.2",
          "id": "c",
          "ignoreSeparator": true,
          "name": "OtherSlice",
        },
        Object {
          "elementId": "d.3",
          "id": "d",
          "ignoreSeparator": true,
          "name": "LeadersSlice",
        },
        Object {
          "elementId": "e.4",
          "id": "e",
          "ignoreSeparator": true,
          "name": "DailyUniversalRegister",
        },
        Object {
          "elementId": "f.5",
          "id": "f",
          "name": "OtherSlice",
        },
        Object {
          "elementId": "g.6",
          "id": "g",
          "ignoreSeparator": true,
          "name": "OtherSlice",
        },
        Object {
          "elementId": "h.7",
          "id": "h",
          "ignoreSeparator": true,
          "name": "LeadersSlice",
        },
        Object {
          "elementId": "i.8",
          "id": "i",
          "name": "OtherSlice",
        },
        Object {
          "elementId": "j.9",
          "id": "j",
          "name": "OtherSlice",
        },
        Object {
          "elementId": "k.10",
          "id": "k",
          "ignoreSeparator": true,
          "name": "OtherSlice",
        },
        Object {
          "elementId": "l.11",
          "id": "l",
          "ignoreSeparator": true,
          "name": "DailyUniversalRegister",
        },
      ]
    `);
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
