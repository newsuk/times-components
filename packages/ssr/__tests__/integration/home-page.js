/* eslint-disable no-unused-expressions */
import { MockEdition } from "@times-components/fixture-generator";

describe("HomePage", () => {
  before(() =>
    cy.task("startMockServerWith", {
      Edition: new MockEdition().get()
    })
  );

  beforeEach(() => {
    cy.visit("/?react=true");
  });

  after(() => cy.task("stopMockServer"));

  it("should have the required HomePage elements", () => {
    cy.get("div");
    cy.get("h1").contains("Home Page");
    cy.get("span");
  });
});
