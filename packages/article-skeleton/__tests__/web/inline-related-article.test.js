import insertInlineRelatedArticles from "../../src/contentModifiers/inline-related-article";

const fakeContent = (type = "paragraph") => ({
  name: type
});
const paywallContent = (outside, inside) => [
  ...outside,
  {
    name: "paywall",
    children: inside
  }
];
const articleRendered = content => {
  const paywalledContent = content.find(({ name }) => name === "paywall");
  return [...content, ...paywalledContent.children].map(({ name }) => name);
};
describe("insertInlineRelatedArticles", () => {
  const slice = { items: [] };
  const contentReducer = insertInlineRelatedArticles(slice, true);

  describe("default", () => {
    describe("inside paywall ", () => {
      it("free slot", () => {
        const content = paywallContent(
          [fakeContent(), fakeContent()],
          [
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent()
          ]
        );
        const result = contentReducer(content);
        expect(articleRendered(result)).toEqual([
          "paragraph",
          "paragraph",
          "paywall",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "autoInlineRelatedArticles",
          "paragraph",
          "paragraph",
          "paragraph"
        ]);
      });
      it("slot not available", () => {
        const content = paywallContent(
          [fakeContent(), fakeContent()],
          [
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent("image"),
            fakeContent(),
            fakeContent(),
            fakeContent()
          ]
        );
        const result = contentReducer(content);
        expect(articleRendered(result)).toEqual([
          "paragraph",
          "paragraph",
          "paywall",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "image",
          "paragraph",
          "paragraph",
          "paragraph",
          "autoInlineRelatedArticles"
        ]);
      });
    });
    describe("outside paywall ", () => {
      it("free slot", () => {
        const content = paywallContent(
          [
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent()
          ],
          []
        );
        const result = contentReducer(content);
        expect(articleRendered(result)).toEqual([
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "autoInlineRelatedArticles",
          "paragraph",
          "paragraph",
          "paragraph",
          "paywall"
        ]);
      });
      it("slot not available", () => {
        const content = paywallContent(
          [
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent(),
            fakeContent("image"),
            fakeContent(),
            fakeContent(),
            fakeContent()
          ],
          []
        );
        const result = contentReducer(content);
        expect(articleRendered(result)).toEqual([
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "paragraph",
          "image",
          "paragraph",
          "paragraph",
          "paragraph",
          "paywall",
          "autoInlineRelatedArticles"
        ]);
      });
    });
  });
  describe("non rendering examples", () => {
    it("no content", () => {
      expect(contentReducer([])).toEqual([]);
    });

    it("outside paywall", () => {
      const content = [
        fakeContent(),
        fakeContent(),
        fakeContent(),
        fakeContent()
      ];
      expect(contentReducer(content)).toEqual(content);
    });
  });
});
