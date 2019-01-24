import mockArticleSlice from "../mock-related-article-slice";

describe("The Mock ArticleSlice", () => {
  it("returns the minimum articleSlice requirements", () => {
    const articleSlice = mockArticleSlice(1);
    expect(articleSlice.items[0]).toHaveProperty("article");
    expect(articleSlice.items[0]).toHaveProperty("headline");
    expect(articleSlice.items[0]).toHaveProperty("leadAsset");
  });
});
