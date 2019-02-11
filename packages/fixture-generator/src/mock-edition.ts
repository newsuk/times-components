import { Edition, PublicationName, Section } from "./types";
import {
  mockMagazineSection,
  mockPuzzleSection,
  mockStandardSection
} from "./mock-section";

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

  getSections(): Array<Section> {
    return [
      mockStandardSection("News"),
      mockStandardSection("Comment"),
      mockStandardSection("World"),
      mockPuzzleSection("Puzzles"),
      mockMagazineSection("Culture")
    ];
  }

  get() {
    return this.edition;
  }
}

export default MockEdition;
