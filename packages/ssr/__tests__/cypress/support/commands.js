import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand({
  failureThreshold: 0.05,
  failureThresholdType: "percent",
  timeout: "60000"
});

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
