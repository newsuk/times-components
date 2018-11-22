describe("Article", () => {
  beforeEach(() => {
    cy.visit("/article/8763d1a0-ca57-11e8-bde6-fae32479843d");
  });

  it("loads hi-res images for related articles", () =>
    cy
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
      }));
});
