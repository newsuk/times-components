
import { MockArticle }  from "@times-components/fixture-generator"

describe("Article", () => {

  it("loads hi-res images for related articles", () => 
    cy.task('startMockServerWith',{Article: new MockArticle().withSundayTimes().withRelatedArticles(3).create()})
      .visit("/article/8763d1a0-ca57-11e8-bde6-fae32479843d")
      .get("#related-articles")
      .scrollIntoView()
      .then(() => {
        // wait for the image to transition and be removed (unfortunately Cypress doesn't auto wait for this)
        cy.wait(2000);

        cy.get("#related-articles img").as("raImages");

        cy.get("@raImages")
          .its("length")
          .should("eq", 3);

        cy.get("@raImages").each(item => {
          const url = new URL(item.attr("src"));

          expect(url.searchParams.get("resize")).to.equal("306");
        });
      })
    );

    afterEach(() => {
      cy.task('stopMockServer');
    })
});
