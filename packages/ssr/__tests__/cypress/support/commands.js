/* eslint-disable no-unused-expressions */
Cypress.Commands.add("goToNextArticle", () => {
  cy.get('div[data-testid="pagination-button-next"]')
    .first()
    .click();
});

Cypress.Commands.add("goToPreviousArticle", () => {
  cy.get('div[data-testid="pagination-button-previous"]')
    .first()
    .click();
});
