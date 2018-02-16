import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";

import RelatedArticles from "../related-articles/related-articles";

import singleRelatedArticleFixture from "../related-articles/fixtures/single-related-article.json";
import singleRelatedArticleNoImageFixture from "../related-articles/fixtures/single-related-article-no-image.json";
import singleRelatedArticleNoLabelFixture from "../related-articles/fixtures/single-related-article-no-label.json";
import singleRelatedArticleNoBylineFixture from "../related-articles/fixtures/single-related-article-no-byline.json";
import twoRelatedArticlesFixture from "../related-articles/fixtures/two-related-articles.json";
import threeRelatedArticlesFixture from "../related-articles/fixtures/three-related-articles.json";

const createRelatedArticlesProps = fixtureData => ({
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
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
    it("handles no related articles", () => {
      const data = {
        relatedArticles: [],
        relatedArticlesLayout: {
          template: "DEFAULT"
        }
      };
      const tree = renderer
        .create(<RelatedArticles {...createRelatedArticlesProps(data)} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(singleRelatedArticleFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article with no lead image", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              singleRelatedArticleNoImageFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article with no label", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              singleRelatedArticleNoLabelFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders single related article with no byline", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              singleRelatedArticleNoBylineFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders two related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(twoRelatedArticlesFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders three related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(threeRelatedArticlesFixture.data)}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
