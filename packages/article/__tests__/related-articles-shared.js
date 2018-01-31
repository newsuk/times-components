import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";

import RelatedArticles from "../related-articles/related-articles";

const singleRelatedArticleFixture = require("../related-articles/fixtures/single-related-article.json");
const singleRelatedArticleNoImageFixture = require("../related-articles/fixtures/single-related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("../related-articles/fixtures/single-related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("../related-articles/fixtures/single-related-article-no-byline.json");

const createRelatedArticlesProps = fixtureData => ({
  ...fixtureData.relatedArticles[0],
  template: fixtureData.relatedArticlesTemplate,
  onPress: () => {}
});

module.exports = () => {
  const realIntl = Intl;

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  context("Related articles", () => {
    it("renders single article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            item={createRelatedArticlesProps(singleRelatedArticleFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single article with no lead image", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            item={createRelatedArticlesProps(
              singleRelatedArticleNoImageFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single article with no label", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            item={createRelatedArticlesProps(
              singleRelatedArticleNoLabelFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single article with no byline", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            item={createRelatedArticlesProps(
              singleRelatedArticleNoBylineFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
