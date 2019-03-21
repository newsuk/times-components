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
  mockListTwoAndSixNoPicSlice
} from "./mock-slice";
import MockImage from "./mock-image";

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
    cover: new MockImage().get(),
    id: "dummy-section-id",
    name: "MagazineSection",
    slices: getSlices(),
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
