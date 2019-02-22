import { mockMagazineSection, mockPuzzleSection, mockStandardSection } from "../mock-section";
import { Puzzle } from "../types";

interface PuzzleWithName extends Puzzle {
  name: string;
}

describe("The Mock Standard Section", () => {
  it("returns the minimum section requirements", () => {
    const title = "News";
    const standardSection = mockStandardSection(title);
    expect(standardSection).toHaveProperty("id");
    expect(standardSection).toHaveProperty("slug");
    expect(standardSection.title).toBe(title);
    expect(standardSection.slices.length).toBeGreaterThan(0);
  });
});

describe("The Mock Magazine Section", () => {
  it("returns the minimum section requirements", () => {
    const title = "Culture";
    const magazineSection = mockMagazineSection(title);
    expect(magazineSection).toHaveProperty("id");
    expect(magazineSection).toHaveProperty("slug");
    expect(magazineSection.title).toBe(title);
    expect(magazineSection.slices.length).toBeGreaterThan(0);
  });
});

describe("The Mock Puzzle Section", () => {
  it("returns the minimum section requirements", () => {
    const title = "Puzzles";
    const puzzleSection = mockPuzzleSection(title);
    expect(puzzleSection).toHaveProperty("id");
    expect(puzzleSection).toHaveProperty("slug");
    expect(puzzleSection.title).toBe(title);
    expect(puzzleSection.slices.length).toBeGreaterThan(0);
    expect((puzzleSection.slices[0] as PuzzleWithName).name).toBe("Puzzle");
  });
});
