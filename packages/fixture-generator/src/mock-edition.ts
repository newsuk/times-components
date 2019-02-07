import {
  Edition,
  PublicationName,
  Section,
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
  mockList2AndSixNoPicSlice
} from "./mock-slice";
import MockImage from "./mock-image";

class MockEdition {
  edition: Edition;

  constructor() {
    this.edition = {
      id: "2b6e462c-225f-11e9-b782-40e94f317da5",
      publishedTime: "2019-02-06T17:00:00.000Z",
      publicationName: PublicationName.TIMES,
      sections: this.getSections()
    };
  }

  getSlices(): Array<ArticleSlice> {
    return [
      mockLeadOneAndFourSlice(),
      mockLeadOneFullWidthSlice(),
      mockLeadOneAndOneSlice(),
      mockLeadOneAndTwoSlice(),
      mockLeadTwoNoPicAndTwoSlice(),
      mockSecondaryOneSlice(),
      mockSecondaryFourSlice(),
      mockSecondaryTwoNoPicAndTwoSlice(),
      mockList2AndSixNoPicSlice()
    ];
  }

  getPuzzleSlices(): Array<PuzzleSectionSlice> {
    return [];
  }

  getStandardSection(title: string): StandardSection {
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
      slices: this.getSlices(),
      slug: "dummy-section-slug",
      title
    };
  }

  getPuzzleSection(title: string): PuzzleSection {
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
      slices: this.getPuzzleSlices(),
      slug: "dummy-section-slug",
      title
    };
  }

  getMagazineSection(title: string): MagazineSection {
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
      slices: this.getSlices(),
      slug: "dummy-section-slug",
      title
    };
  }

  getSections(): Array<Section> {
    return [
      this.getStandardSection("News"),
      this.getStandardSection("Comment"),
      this.getStandardSection("World"),
      this.getPuzzleSection("Puzzles"),
      this.getMagazineSection("Culture")
    ];
  }

  get() {
    return this.edition;
  }
}

export default MockEdition;
