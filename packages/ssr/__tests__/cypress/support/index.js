// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import "cypress-axe";

// Alternatively you can use CommonJS syntax:
require("cypress-failed-log");
require("cypress-wait-until");

Cypress.on("fail", error => {
  // debugger;
  throw error;
});

Cypress.on("uncaught:exception", err => {
  // should only contain errors that are occuring inside of third party scripts
  // see https://docs.cypress.io/guides/references/error-messages.html#Cypress-detected-that-an-uncaught-error-was-thrown-from-a-cross-origin-script
  if (err.message.includes("cross-origin-script-error")) {
    return false;
  }
  return true;
});

export const checkDropCapChanges = path => {
  cy.waitUntil(
    () =>
      cy
        .get(path)
        .should("be.visible") // yields <nav>
        .should("have.css", "font-family") // yields 'sans-serif'
        .and("match", /TimesModern-Regular/),
    {
      errorMsg: "Element is not found even after waiting",
      timeout: 10000,
      interval: 500
    }
  );
};

export const checkShareBarLoaded = path => {
  cy.waitUntil(
    () =>
      cy
        .get(path)
        .should("have.css", "justify-content") // yields 'sans-serif'
        .and("match", /space-between/),
    {
      errorMsg: "Element is not found even after waiting",
      timeout: 10000,
      interval: 500
    }
  );
};

export const waitUntilSelectorExists = (
  skipDropCapCheck,
  remainingAttempts
) => {
  let selector = '[class^="responsive__DropCap-sc-"]';
  if (skipDropCapCheck) {
    selector = '[data-testid="save-and-share-bar"]';
  }
  const $el = Cypress.$(selector);
  if ($el.length) {
    // At least one tag was found.
    // Return a jQuery object.
    return $el;
  }

  if (remainingAttempts - 1) {
    cy.log(`Selector not found yet. Remaining attempts: ${remainingAttempts}`);

    // Requesting the page to reload (F5)
    cy.reload(true);

    // Wait a second for the server to respond and the DOM to be updated.
    return cy
      .wait(1000)
      .then(waitUntilSelectorExists(skipDropCapCheck, remainingAttempts));
  }
  throw Error("Selector was not found.");
};
