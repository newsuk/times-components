/* eslint-disable no-unused-expressions */

import { MockTopic, MockArticle } from "@times-components/fixture-generator";

describe("The Topic Page", () => {
  before(() => {
    cy.task("startMockServerWith", {
      Article: new MockArticle().get(),
      Topic: new MockTopic().setTopicArticles(25).get()
    });
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

  it("should take you to the article page once an article has been selected", () => {
    cy.get(`div[data-testid="article-list-item-0"]`).click();

    expect(cy.get('[data-testid="standfirst"]')).to.exist;
  });

  it("loads inline-ad", () => {
    expect(cy.get("#inline-ad")).to.exist;
  });

  it("navigates between article pages", () => {
    cy.url().should("include", "?page=1");
    cy.goToNextArticle();
    cy.url().should("include", "?page=2");
    cy.goToPreviousArticle();
    cy.url().should("include", "?page=1");
  });
});
