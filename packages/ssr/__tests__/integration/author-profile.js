/* eslint-disable no-unused-expressions */
import { MockAuthor, MockArticle } from "@times-components/fixture-generator";

describe("AuthorProfile", () => {
  before(() =>
    cy.task("startMockServerWith", {
      Article: new MockArticle().get(),
      Author: new MockAuthor().setAuthorArticles(35).get()
    })
  );

  beforeEach(() => {
    cy.visit("/profile/fiona-hamilton");
  });

  after(() => cy.task("stopMockServer"));

  it("Should have the Author head required elements", () => {
    cy.get('div[data-testid="author-head"]');
    cy.get('h1[data-testid="author-name"]');
    cy.get('h2[role="heading"]');
    cy.get('div[data-testid="author-bio"]');
  });

  it("Click on an article in the author article list takes you to the article page", () => {
    cy.get(`div[data-testid="article-list-item-0"]`).click();

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
    cy.url().should("include", "?page=1");
  });
});
