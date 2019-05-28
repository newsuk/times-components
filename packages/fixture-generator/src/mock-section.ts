import {
  StandardSection,
  PuzzleSection,
  MagazineSection,
  PuzzleSectionSlice,
  ArticleSlice
} from "./types";
import {
  mockLeadOneAndFourSlice,
  mockLeadOneFullWidthSlice,
  mockLeadOneAndOneSlice,
  mockLeadOneAndTwoSlice,
  mockLeadTwoNoPicAndTwoSlice,
  mockPuzzleSlice,
  mockSecondaryOneSlice,
  mockSecondaryFourSlice,
  mockSecondaryTwoNoPicAndTwoSlice,
  mockStandardSlice,
  mockListTwoAndSixNoPicSlice
} from "./mock-slice";

function getSlices(): Array<ArticleSlice> {
  return [
    mockLeadOneAndFourSlice(),
    mockLeadOneFullWidthSlice(),
    mockLeadOneAndOneSlice(),
    mockLeadOneAndTwoSlice(),
    mockLeadTwoNoPicAndTwoSlice(),
    mockSecondaryOneSlice(),
    mockSecondaryFourSlice(),
    mockSecondaryTwoNoPicAndTwoSlice(),
    mockListTwoAndSixNoPicSlice()
  ];
}

function getMagazineSlices(): Array<ArticleSlice> {
  return [mockStandardSlice()];
}

function getPuzzleSlices(count: number): Array<PuzzleSectionSlice> {
  return new Array(count)
    .fill(0)
    .map((_, index) => ({ ...mockPuzzleSlice(), id: `${index}` }));
}

interface StandardSectionWithName extends StandardSection {
  name: string;
}

interface PuzzleSectionWithName extends PuzzleSection {
  name: string;
}

interface MagazineSectionWithName extends MagazineSection {
  name: string;
}

function mockStandardSection(title: string): StandardSectionWithName {
  return {
    colour: {
      rgba: {
        alpha: 1,
        blue: 255,
        green: 255,
        red: 255
      }
    },
    id: "dummy-section-id",
    name: "StandardSection",
    slices: getSlices(),
    slug: "dummy-section-slug",
    title
  };
}

function mockPuzzleSection(title: string): PuzzleSectionWithName {
  return {
    colour: {
      rgba: {
        alpha: 1,
        blue: 255,
        green: 255,
        red: 255
      }
    },
    id: "dummy-section-id",
    name: "PuzzleSection",
    slices: getPuzzleSlices(7),
    slug: "dummy-section-slug",
    title
  };
}

function mockMagazineSection(title: string): MagazineSectionWithName {
  return {
    colour: {
      rgba: {
        alpha: 1,
        blue: 255,
        green: 255,
        red: 255
      }
    },
    cover: {
      id: "dummy-cover-id",
      crops: [
        {
          ratio: "35:43",
          url:
            "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9de951a0-5249-11e9-82c1-b5b0bbeb9bfd.jpg?crop=1050%2C1290%2C0%2C0"
        }
      ]
    },
    id: "dummy-section-id",
    name: "MagazineSection",
    slices: getMagazineSlices(),
    slug: "dummy-section-slug",
    title
  };
}

export {
  getPuzzleSlices,
  mockMagazineSection,
  mockPuzzleSection,
  mockStandardSection
};
