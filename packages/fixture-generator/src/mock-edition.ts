import { Edition, PublicationName, Region, Section } from "./types";
import {
  mockPuzzleSection,
  mockStandardSection,
  mockStandardSectionWithSecondaryTwoSlices
} from "./mock-section";

class MockEdition {
  edition: Edition;

  constructor() {
    this.edition = {
      id: "2b6e462c-225f-11e9-b782-40e94f317da5",
      date: "2019-02-06",
      publishedTime: "2019-02-06T17:00:00.000Z",
      updatedTime: "2019-02-06T17:12:01.000Z",
      publicationName: PublicationName.Times,
      region: Region.Default,
      sections: this.getSections(),
      revision: 1,
      images: {
        list: []
      }
    };
  }

  getSections(): Array<Section> {
    return [
      mockStandardSection("News"),
      mockStandardSection("Comment"),
      mockStandardSection("World"),
      mockPuzzleSection("Puzzles"),
      mockStandardSectionWithSecondaryTwoSlices("Comment")
    ];
  }

  get() {
    return this.edition;
  }
}

export default MockEdition;
