import ArticleSlice from "../mock-article-slice";

describe("The Mock Image", () => {
  it("returns the minimum articleSlice requirements", () => {
    const articleSlice = ArticleSlice(3);
    expect(articleSlice.items[0]).toHaveProperty("article");
    expect(articleSlice.items[0]).toHaveProperty("headline");
    expect(articleSlice.items[0]).toHaveProperty("leadAsset");
  });
});
