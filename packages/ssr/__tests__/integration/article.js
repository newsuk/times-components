import { MockArticle } from "@times-components/fixture-generator";

const relatedArticleCount = 3;

describe("Article", () => {
  it("loads hi-res images for related articles", () =>
    cy
      .task("startMockServerWith", {
        Article: new MockArticle()
          .sundayTimes()
          .setRelatedArticles(relatedArticleCount)
          .get()
      })
      .visit("/article/8763d1a0-ca57-11e8-bde6-fae32479843d")
      .get("#related-articles")
      .scrollIntoView()
      .then(() => {
        // wait for the image to transition and be removed (unfortunately Cypress doesn't auto wait for this)
        cy.wait(2000);

        cy.get("#related-articles img").as("raImages");

        cy.get("@raImages")
          .its("length")
          .should("eq", relatedArticleCount);

        cy.get("@raImages").each(item => {
          const url = new URL(item.attr("src"));
          const initialResize = "100";
          expect(url.searchParams.get("resize")).to.not.equal(initialResize);
        });
      }));

  xit("loaded all the required article ads", () => {
    cy.loadedArticleAds();
  });
});
