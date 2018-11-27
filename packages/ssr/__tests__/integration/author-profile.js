/* eslint-disable no-unused-expressions */
describe("AuthorProfile", () => {
  const id = "97c64f20-cb67-11e4-a202-50ac5def393a.0";
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
    cy.get(`div[data-testid="${id}"]`);
  });

  it("Click on an article in the author list takes you to the corresponding article", () => {
    cy.get(`div[data-testid="${id}"]`).click();
    cy.url().should(
      "eq",
      "http://localhost:3000/article/97c64f20-cb67-11e4-a202-50ac5def393a"
    );
  });

  it("Next and Previous Pagination works", () => {
    cy.goToNextArticle();
    cy.goToPreviousArticle();
    expect(cy.get('div[data-testid="pagination-button-next"]')).to.exist;
  });
});
