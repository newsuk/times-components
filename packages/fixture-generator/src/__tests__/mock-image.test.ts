import MockImage from "../mock-image";

describe("The Mock Image", () => {
  it("returns the minimum image requirements", () => {
    const mockImage = new MockImage().get();
    expect(mockImage).toHaveProperty("id");
    expect(mockImage).toHaveProperty("crop");
    expect(mockImage).toHaveProperty("title");
  });
});
