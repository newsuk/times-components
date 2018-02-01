import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";

import Slice from "../slice";

const singleRelatedArticleFixture = require("@times-components/article/related-articles/fixtures/single-related-article.json");
const singleRelatedArticleNoImageFixture = require("@times-components/article/related-articles/fixtures/single-related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("@times-components/article/related-articles/fixtures/single-related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("@times-components/article/related-articles/fixtures/single-related-article-no-byline.json");

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
    it("renders single slice with related", () => {
      const tree = renderer
        .create(
          <Slice
            item={createRelatedArticlesProps(singleRelatedArticleFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single slice with related with no lead image", () => {
      const tree = renderer
        .create(
          <Slice
            item={createRelatedArticlesProps(
              singleRelatedArticleNoImageFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single slice with related with no label", () => {
      const tree = renderer
        .create(
          <Slice
            item={createRelatedArticlesProps(
              singleRelatedArticleNoLabelFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single slice with related with no byline", () => {
      const tree = renderer
        .create(
          <Slice
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
