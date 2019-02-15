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

function getPuzzleSlices(): Array<PuzzleSectionSlice> {
  return [];
}

function mockStandardSection(title: string): StandardSection {
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
    slices: getSlices(),
    slug: "dummy-section-slug",
    title
  };
}

function mockPuzzleSection(title: string): PuzzleSection {
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
    slices: getPuzzleSlices(),
    slug: "dummy-section-slug",
    title
  };
}

function mockMagazineSection(title: string): MagazineSection {
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
    slices: getSlices(),
    slug: "dummy-section-slug",
    title
  };
}

export { mockMagazineSection, mockPuzzleSection, mockStandardSection };
