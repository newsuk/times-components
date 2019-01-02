/* eslint-disable no-unused-expressions */
import { MockAuthor, MockArticle } from "@times-components/fixture-generator";

describe("AuthorProfile", () => {

  const articleId = "522abf2c-e752-11e8-9f32-f2801f1b9fd1";

  before(() => 
    cy.task("startMockServerWith", {
      Author: new MockAuthor()
        .setAuthorArticles(35)
        .get(),
      Article: new MockArticle().get()
    })
  );

  beforeEach(() => {
    cy.visit("/profile/fiona-hamilton")
  })

  after(() => 
    cy.task("stopMockServer")
  );

  it("Should have the Author head required elements", () => {
    cy.get('div[data-testid="author-head"]');
    cy.get('h1[data-testid="author-name"]');
    cy.get('h2[role="heading"]');
    cy.get('div[data-testid="author-bio"]');
  });

  it("Click on an article in the author article list takes you to the article page", () => {
    cy
      .get(`div[data-testid="article-list-item-0"]`)
      .click();
    
    expect(cy.get('[data-testid="standfirst"]')).to.exist;

  });

  xit("loads inline-ad", () => {
    cy.loadedAd("#inline-ad");
  });

   it("Next and Previous Pagination works", () => {
    cy.url().should('include', '?page=1')
    cy.goToNextArticle();
    cy.url().should('include', '?page=2')
    cy.goToPreviousArticle();
    cy.url().should('include', '?page=1')

  });
});
