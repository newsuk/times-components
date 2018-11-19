import sharedTest from "../shared-article-list";

describe("Topic", () => {
  const id = "97c64f20-cb67-11e4-a202-50ac5def393a.0";
  beforeEach(() => {
    cy.visit("/topic/canada");
  });

  it("Topic head has required elements", () => {
    cy.get("#main-container > div:nth-child(1)");
    cy.get("#main-container h1")
      .first()
      .contains("Canada");
    cy.get('div[data-testid="topic-description"]');
  });

  it("Topic has article elememts on the page", () => {
    cy.get(`div[data-testid="${id}"]`);
  });

  it("Click on an article in the topic list takes you to the corresponding article", () => {
    cy.get(`div[data-testid="${id}"]`).click();
    cy.url().should(
      "eq",
      "http://localhost:3000/article/97c64f20-cb67-11e4-a202-50ac5def393a"
    );
  });

  sharedTest();
});
