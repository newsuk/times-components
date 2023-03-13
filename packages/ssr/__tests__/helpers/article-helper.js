import { MockArticle, MockUser } from "@times-components/fixture-generator";
import {
  checkDropCapChanges,
  checkShareBarLoaded,
  waitUntilSelectorExists
} from "../cypress/support";

const relatedArticleCount = 3;

const articleTemplateTest = (template, options = {}) => {
  const qs = options.qs || "";
  const variant = options.variant || "Default";
  const articlePath = `/article/8763d1a0-ca57-11e8-bde6-fae32479843d`;
  const pageUrl = `${articlePath}${qs}`;

  describe(`Article - ${template} - ${variant}`, () => {
    let sundayTimesArticleWithThreeRelatedArticles;
    let userWithBookmarks;

    beforeEach(() => {
      sundayTimesArticleWithThreeRelatedArticles = new MockArticle()
        .sundayTimes()
        .setRelatedArticles(relatedArticleCount)
        .setTemplate(template)
        .get();
      userWithBookmarks = new MockUser().setBookmarksTotal(3);
    });

    afterEach(() => {
      cy.task("stopMockServer");
    });

    it("loads hi-res images for related articles", () =>
      cy
        .task("startMockServerWith", {
          Article: sundayTimesArticleWithThreeRelatedArticles,
          User: userWithBookmarks
        })
        .visit(pageUrl)
        .get("#related-articles")
        .scrollIntoView()
        .then(() => {
          cy.get("#related-articles > div:first-child img:first-child").as(
            "raImages"
          );

          cy.get("@raImages")
            .its("length")
            .should("eq", relatedArticleCount);

          cy.get("@raImages").each(item => {
            const url = new URL(item.attr("src"));
            const initialResize = "100";
            expect(url.searchParams.get("resize")).to.not.equal(initialResize);
          });
        }));

    it("loads all the required article ads", () => {
      cy.task("startMockServerWith", {
        Article: sundayTimesArticleWithThreeRelatedArticles,
        User: userWithBookmarks
      })
        .visit(pageUrl)
        .wait(2000);

      cy.get("#ad-header").should("exist");

      cy.get("#ad-article-inline").should("exist");

      cy.get("#ad-pixel").should("exist");

      cy.get("#ad-pixelteads").should("exist");

      cy.get("#ad-pixelskin").should("exist");
    });

    it("has SpotIM comment tag when article comments are enabled", () => {
      const articleWithCommentsEnabled = new MockArticle()
        .sundayTimes()
        .setCommentsEnabled(true)
        .get();

      cy.task("startMockServerWith", {
        Article: articleWithCommentsEnabled,
        User: userWithBookmarks
      }).visit(pageUrl);

      cy.get("script[data-spotim-module]")
        .should("have.attr", "src", "https://launcher.spot.im/spot/5p0t_1m_1d")
        .should("have.attr", "data-post-id", articleWithCommentsEnabled.id)
        .should(
          "have.attr",
          "data-post-url",
          `https://www.thetimes.co.uk/article/${articleWithCommentsEnabled.id}`
        );
    });

    it("does not have SpotIM comment tag when article comments are disabled", () => {
      const articleWithCommentsDisabled = new MockArticle()
        .sundayTimes()
        .setCommentsEnabled(false)
        .get();

      cy.task("startMockServerWith", {
        Article: articleWithCommentsDisabled,
        User: userWithBookmarks
      }).visit(pageUrl);

      cy.get("script[data-spotim-module]").should("not.exist");
    });

    it("should match snapshots", () => {
      const {
        stickyElements = [],
        blackoutElements = [],
        attachFlags = false,
        skipDropCapCheck = false,
        skipSnapshotTest = false
      } = options;
      if (skipSnapshotTest) return; // we need to add docker to execute the snapshot testing as viewport is
      // is mismatching while running the test cases on local server. Here is the link to the ticket
      // in which docker server will be used.: https://nidigitalsolutions.jira.com/browse/TDP-1249
      const articleProps =
        (attachFlags && {
          ...sundayTimesArticleWithThreeRelatedArticles,
          dropcapsDisabled: false,
          sharingEnabled: true,
          savingEnabled: true
        }) ||
        sundayTimesArticleWithThreeRelatedArticles;
      cy.task("startMockServerWith", {
        Article: articleProps,
        User: userWithBookmarks
      })
        .visit(pageUrl)
        .then(() => {
          if (attachFlags) {
            waitUntilSelectorExists(skipDropCapCheck, 3);
            if (!skipDropCapCheck)
              checkDropCapChanges('[class^="responsive__DropCap-"]');
            checkShareBarLoaded("[data-testid=save-and-share-bar]");
          }

          // changed the position of navigation bar element to absolute, so we don't see
          // duplicate elements floating
          stickyElements.forEach(selector => {
            cy.get(selector).then(el => el.css("position", "absolute"));
          });
          cy.get("body").matchImageSnapshot({
            blackout: blackoutElements
          });
        });
    });

    it("should pass basic a11y test", () => {
      cy.task("startMockServerWith", {
        Article: sundayTimesArticleWithThreeRelatedArticles,
        User: userWithBookmarks
      })
        .visit(pageUrl)
        .wait(1000)
        .injectAxe()
        .wait(200)
        .configureAxe({
          rules: [
            {
              id: "color-contrast",
              enabled: false
            },
            {
              id: "frame-title-unique",
              enabled: false
            },
            {
              id: "region",
              enabled: false
            }
          ]
        })
        .checkA11y();
    });
  });
};

export default articleTemplateTest;
