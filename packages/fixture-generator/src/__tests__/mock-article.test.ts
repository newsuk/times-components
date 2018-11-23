import MockArticle from "../mock-article";

describe("The mock Article", () => {
  it("should return the minimum article type requirements", () => {
    const mockArticle = new MockArticle().create();
    expect(mockArticle).toHaveProperty("id");
    expect(mockArticle).toHaveProperty("keywords");
    expect(mockArticle).toHaveProperty("publicationName");
  });

  it("should return a sunday times article", () => {
    const mockArticle = new MockArticle().sundayTimes().create();
    expect(mockArticle.publicationName).toBe("SUNDAYTIMES");
  });

  it("should return x related articles", () => {
    const mockArticle = new MockArticle().withRelatedArticles(5).create();
    expect(mockArticle.relatedArticleSlice!.items.length).toBe(5);
  })
});
