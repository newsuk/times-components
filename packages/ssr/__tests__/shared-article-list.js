module.exports = () =>
  it("Next and Previous Pagination works", () => {
    cy.get('div[data-testid="pagination-button-next"]')
      .first()
      .click();
    cy.get('div[data-testid="pagination-button-previous"]')
      .first()
      .click();
    cy.get('div[data-testid="pagination-button-next"]');
  });
