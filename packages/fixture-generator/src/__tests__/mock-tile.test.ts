import MockTile from "../mock-tile";

describe("The Mock Tile", () => {
  it("returns the minimum tile requirements", () => {
    const mockTile = new MockTile().get();
    expect(mockTile).toHaveProperty("article");
    expect(mockTile).toHaveProperty("headline");
    expect(mockTile).toHaveProperty("leadAsset");
    expect(mockTile).toHaveProperty("strapline");
  });
});
