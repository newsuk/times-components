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

Cypress.Commands.add("loadedAd", selector => {
  //  open devtools
  // cy.get(selector).debug().pause();
  cy.wait(2000);
  cy.get(selector).should(element => {
    expect(element).to.exist;
    expect(element).to.be.visible;
    expect(element).to.not.be.empty;
  });
  cy.get(selector)
    .get("googleQueryId")
    .should("not.be.empty");
});

Cypress.Commands.add("loadedGlobalAds", () => {
  cy.loadedAd("#pixel");
  cy.loadedAd("#pixelteads");
  cy.loadedAd("#pixelskin");
  cy.loadedAd("#header");
});

Cypress.Commands.add("loadedArticleAds", () => {
  cy.loadedGlobalAds();
  cy.loadedAd("#inline-ad");
});
