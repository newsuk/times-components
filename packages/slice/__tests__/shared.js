import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";
import singleRelatedArticleFixture from "@times-components/article/related-articles/fixtures/single-related-article.json";
import singleRelatedArticleNoImageFixture from "@times-components/article/related-articles/fixtures/single-related-article-no-image.json";
import singleRelatedArticleNoLabelFixture from "@times-components/article/related-articles/fixtures/single-related-article-no-label.json";
import singleRelatedArticleNoBylineFixture from "@times-components/article/related-articles/fixtures/single-related-article-no-byline.json";
import Slice from "../slice";

const createRelatedArticlesProps = fixtureData => ({
  ...fixtureData.relatedArticles[0],
  template: fixtureData.relatedArticlesTemplate,
  onPress: () => {}
});

// @TODO: DEFAULT WITH NO CHILD
// @TODO: DEFAULT WITH ONE CHILD
// @TODO: DEFAULT WITH TWO CHILDREN

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
