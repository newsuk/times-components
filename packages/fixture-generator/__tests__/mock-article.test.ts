import MockArticle from "../src/mock-article";

describe("The mock Article", () => {
  it("returns the minimum article requirements", () => {
    const mockArticle = new MockArticle().create();
    expect(mockArticle).toHaveProperty("id");
    expect(mockArticle).toHaveProperty("keywords");
    expect(mockArticle).toHaveProperty("publicationName");
  });

  it("returns a sunday times article", () => {
    const mockArticle = new MockArticle().withSundayTimes().create();
    expect(mockArticle.publicationName).toBe("SUNDAYTIMES");
  });

  it("returns an image", () => {
    const mockArticle = new MockArticle().withImageLeadAsset().create();
    expect(mockArticle.leadAsset).toHaveProperty("crop")
  })

  it("returns related articles", () => {
    const mockArticle = new MockArticle().withRelatedArticles(5).create();
    expect(mockArticle.relatedArticleSlice!.items.length).toBe(5);
  })
});
