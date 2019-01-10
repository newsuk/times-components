import MockArticle from "../mock-article";
import { TemplateType } from "../types";

describe("The mock Article", () => {
  it("should return the minimum article type requirements", () => {
    const mockArticle = new MockArticle().get();
    expect(mockArticle).toHaveProperty("id");
    expect(mockArticle).toHaveProperty("keywords");
    expect(mockArticle).toHaveProperty("publicationName");
  });

  it("should return a sunday times article", () => {
    const mockArticle = new MockArticle().sundayTimes().get();
    expect(mockArticle.publicationName).toBe("SUNDAYTIMES");
  });

  it("should return x related articles", () => {
    const mockArticle = new MockArticle().setRelatedArticles(5).get();
    expect(mockArticle.relatedArticleSlice!.items.length).toBe(5);
  });

  it("should return a maincomment template", () => {
    const mockArticle = new MockArticle().setTemplate('maincomment' as TemplateType).get();
    expect(mockArticle.template).toBe("maincomment");
  });
});
