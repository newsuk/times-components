import MockImage from "../resolvers/image";

describe("The Mock Image", () => {
  it("returns the minimum image requirements", () => {
    const mockImage = new MockImage().create();
    expect(mockImage).toHaveProperty("id");
    expect(mockImage).toHaveProperty("crop");
  });
});
