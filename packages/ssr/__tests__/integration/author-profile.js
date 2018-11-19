describe("AuthorProfile", () => {
  beforeEach(() => {
    cy.visit("/profile/fiona-hamilton");
  });

  it("Author head has required elements", () => {
    cy.get('div[data-testid="author-head"]');
    cy.get('h1[data-testid="author-name"]');
    cy.get('h2[role="heading"]');
    cy.get('div[data-testid="author-bio"]');
  });

  it("Author has article elememts on the page", () => {
    cy.get('div[data-testid="97c64f20-cb67-11e4-a202-50ac5def393a.0"]');
  });

  it("Click on Author list takes you to an article", () => {
    cy.get('div[data-testid="97c64f20-cb67-11e4-a202-50ac5def393a.0"]').click();
    cy.url().should(
      "eq",
      "http://localhost:3000/article/97c64f20-cb67-11e4-a202-50ac5def393a"
    );
  });

  it("Next and Previous Pagination works", () => {
    cy.get('div[data-testid="pagination-button-next"]')
      .first()
      .click();
    cy.get('div[data-testid="pagination-button-previous"]')
      .first()
      .click();
    cy.get('div[data-testid="pagination-button-next"]');
  });
});
