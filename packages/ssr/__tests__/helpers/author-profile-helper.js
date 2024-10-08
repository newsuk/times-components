/* eslint-disable no-unused-expressions */
import { MockAuthor, MockArticle } from "@times-components/fixture-generator";
import { terminalLog } from "../cypress/support/e2e.js";

export default (options = {}) => {
  const qs = options.qs || "";
  const variant = options.variant || "Default";
  const profilePath = `/profile/fiona-hamilton`;
  const pageUrl = `${profilePath}${qs}`;

  describe(`Author Profile - ${variant}`, () => {
    before(() =>
      cy.task("startMockServerWith", {
        Article: new MockArticle().get(),
        Author: new MockAuthor().setAuthorArticles(35).get()
      })
    );

    beforeEach(() => {
      cy.visit(pageUrl);
    });

    after(() => cy.task("stopMockServer"));

    it("should have the required Author head elements", () => {
      cy.get('div[data-testid="author-head"]');
      cy.get('h1[data-testid="author-name"]');
      cy.get('h2[role="heading"]');
      cy.get('div[data-testid="author-bio"]');
    });

    it("should take you to the article page once an article has been selected", () => {
      cy.wait(2000);
      cy.get(`div[data-testid="article-list-item-0"]`).click();
      expect(cy.get('[data-testid="standfirst"]')).to.exist;
    });

    it("loads inline-ad", () => {
      expect(cy.get("#ad-article-inline")).to.exist;
    });

    it("navigates between article pages", () => {
      cy.url().should("not.include", "?page=1");
      cy.goToNextArticle();
      cy.url().should("include", "?page=2");
      cy.goToPreviousArticle();
      cy.url().should("include", "?page=1");
    });

    it("should pass basic a11y test", () => {
      cy.injectAxe();
      cy.wait(1000);
      cy.configureAxe({
        rules: [
          {
            id: "color-contrast",
            enabled: false
          },
          {
            id: "region",
            enabled: false
          }
        ]
      });
      cy.checkA11y(null, null, terminalLog, null);
    });

    it("should match snapshots", () => {
      const { stickyElements = [], skipSnapshotTest = false } = options;
      if (skipSnapshotTest) return; // we need to add docker to execute the snapshot testing as viewport is
      // is mismatching while running the test cases on local server. Here is the link to the ticket
      // in which docker server will be used.:  https://nidigitalsolutions.jira.com/browse/TDP-1249

      // changed the position of navigation bar element to absolute, so we don't see
      // duplicate elements floating
      stickyElements.forEach(selector => {
        cy.get(selector).then(el => el.css("position", "absolute"));
      });
      cy.matchImageSnapshot();
    });
  });
};
