import { MockArticle } from "@times-components/fixture-generator";

const relatedArticleCount = 3;

describe("Article", () => {
  let sundayTimesArticleWithThreeRelatedArticles;

  beforeEach(() => {
    sundayTimesArticleWithThreeRelatedArticles = new MockArticle()
      .sundayTimes()
      .setRelatedArticles(relatedArticleCount)
      .get();
  });

  afterEach(() => {
    cy.task("stopMockServer");
  });

  it("loads hi-res images for related articles", () =>
    cy
      .task("startMockServerWith", {
        Article: sundayTimesArticleWithThreeRelatedArticles
      })
      .visit("/article/8763d1a0-ca57-11e8-bde6-fae32479843d")
      .get("#related-articles")
      .scrollIntoView()
      .then(() => {
        // wait for the image to transition and be removed (unfortunately Cypress doesn't auto wait for this)
        cy.wait(2000);

        cy.get("#related-articles img").as("raImages");

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
      Article: sundayTimesArticleWithThreeRelatedArticles
    })
      .visit("/article/8763d1a0-ca57-11e8-bde6-fae32479843d")
      .wait(2000);

    cy.get("#header")
      .should("exist")
      .should("be.visible")
      .should("not.be.empty");

    cy.get("#header")
      .get("googleQueryId")
      .should("not.be.empty");
  });

  it("has SpotIM comment tag", () => {
    const articleWithCommentsEnabled = {
      ...sundayTimesArticleWithThreeRelatedArticles,
      commentsEnabled: true
    };

    cy.task("startMockServerWith", {
      Article: articleWithCommentsEnabled
    }).visit("/article/8763d1a0-ca57-11e8-bde6-fae32479843d");

    cy.get("script[data-spotim-module]")
      .should("have.attr", "src", "https://launcher.spot.im/spot/5p0t_1m_1d")
      .should("have.attr", "data-post-id", articleWithCommentsEnabled.id)
      .should(
        "have.attr",
        "data-post-url",
        `https://www.thetimes.co.uk/article/${articleWithCommentsEnabled.id}`
      );
  });
});
