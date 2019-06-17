import MockPuzzle, { PuzzleImage } from "../mock-puzzle";

describe("Mock Puzzle", () => {
  it("returns the minimum puzzle requirements", () => {
    const mockPuzzle = new MockPuzzle().get();
    expect(mockPuzzle).toHaveProperty("id");
    expect(mockPuzzle).toHaveProperty("title");
    expect(mockPuzzle).toHaveProperty("url");
    expect(mockPuzzle).toHaveProperty("image");
    expect(mockPuzzle).toHaveProperty("hideOnMobile");
  });

  it("creates Puzzle image with crop url", () => {
    const puzzleImage = new PuzzleImage().get();
    expect(puzzleImage.crop32).toBeDefined();
    expect(puzzleImage.crop32!.url).toBeDefined();
  });
});
