import MockImage from "../src/resolvers/image";

describe("The Mock Image", () => {
  it("returns the minimum image requirements", () => {
    const mockImage = new MockImage().fetch();
    expect(mockImage).toHaveProperty("id");
    expect(mockImage).toHaveProperty("crop");
  });
});