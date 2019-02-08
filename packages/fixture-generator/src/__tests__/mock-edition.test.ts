import MockEdition from "../mock-edition"
import { StandardSection } from "../types";

describe("The Mock Edition", () => {
  it("returns the minimum edition requirements", () => {
    const edition = new MockEdition().get();
    expect(edition).toHaveProperty("id");
    expect(edition).toHaveProperty("publishedTime");
    expect(edition).toHaveProperty("publicationName");

    expect(edition.sections).not.toBeNull();
    expect(edition.sections ? edition.sections.length : 0).toBeGreaterThan(0);
    const newsSection = edition.sections![0] as StandardSection;
    expect(newsSection.title).toBe("News");
    
    expect(newsSection.slices ? newsSection.slices.length : 0).toBeGreaterThan(0);
  });
});
