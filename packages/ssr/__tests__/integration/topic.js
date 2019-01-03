/* eslint-disable no-unused-expressions */

import { MockTopic, MockArticle } from "@times-components/fixture-generator";

describe("The Topic Page", () => {
  const id = "97c64f20-cb67-11e4-a202-50ac5def393a.0";

  before(() => {
    cy
      .task("startMockServerWith", {
        Article: new MockArticle().get(),
        Topic: new MockTopic().setTopicArticles(25).get()
      })
  });

  beforeEach(() => {
    cy.visit("/topic/canada");
  }); 

  after(() => {
    cy.task("stopMockServer");
  });

  it("Topic head has required elements", () => {
    cy.get("#main-container > div:nth-child(1)");
    cy.get("#main-container h1")
      .first()
      .contains("Topic Page");
    cy.get('div[data-testid="topic-description"]');
  });

  it("Topic has article elememts on the page", () => {
    cy.get(`div[data-testid="${id}"]`);
  });

  it("Clicking on an article in the topic article list takes you to the article page", () => {
    cy.get(`div[data-testid="${id}"]`).click();
    expect(cy.get('[data-testid="standfirst"]')).to.exist;
  });

  it("loads inline-ad", () => {
    expect(cy.get("#inline-ad")).to.exist;
  });

  it("Next and Previous Pagination works", () => {
    cy.url().should("include", "?page=1");
    cy.goToNextArticle();
    cy.url().should("include", "?page=2");
    cy.goToPreviousArticle();
    cy.url().should("include", "?page=1")
  });
});
