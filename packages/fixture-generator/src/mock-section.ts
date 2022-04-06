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
  mockSecondaryTwoAndTwoSlice,
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
    mockSecondaryTwoAndTwoSlice(),
    mockSecondaryTwoNoPicAndTwoSlice(),
    mockListTwoAndSixNoPicSlice()
  ];
}

function getSecondaryTwoSlices(): Array<ArticleSlice> {
  return [mockSecondaryTwoAndTwoSlice(), mockSecondaryTwoNoPicAndTwoSlice()];
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

function mockStandardSectionWithSecondaryTwoSlices(
  title: string
): StandardSectionWithName {
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
    slices: getSecondaryTwoSlices(),
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

export {
  getPuzzleSlices,
  mockPuzzleSection,
  mockStandardSection,
  mockStandardSectionWithSecondaryTwoSlices
};
