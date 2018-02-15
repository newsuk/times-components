import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import context from "jest-context";

import RelatedArticles from "../related-articles/related-articles";

import oneDefaultRelatedArticleFixture from "../related-articles/fixtures/default/one-default.json";
import oneDefaultRelatedArticleNoImageFixture from "../related-articles/fixtures/default/one-no-image.json";
import oneDefaultRelatedArticleNoLabelFixture from "../related-articles/fixtures/default/one-no-label.json";
import oneDefaultRelatedArticleNoBylineFixture from "../related-articles/fixtures/default/one-no-byline.json";
import twoDefaultRelatedArticlesFixture from "../related-articles/fixtures/default/two-default.json";
import threeDefaultRelatedArticlesFixture from "../related-articles/fixtures/default/three-default.json";
import oneLeadAndTwoRelatedArticleFixture from "../related-articles/fixtures/lead-and-two/one-default.json";

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
    it("handles an empty articles array", () => {
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

    it("renders one DEFAULT related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              oneDefaultRelatedArticleFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders one DEFAULT related article with no lead image", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              oneDefaultRelatedArticleNoImageFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders one DEFAULT related article with no label", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              oneDefaultRelatedArticleNoLabelFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders one DEFAULT related article with no byline", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              oneDefaultRelatedArticleNoBylineFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders two DEFAULT related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              twoDefaultRelatedArticlesFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders three DEFAULT related articles", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              threeDefaultRelatedArticlesFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders one LEAD_AND_TWO related article", () => {
      const tree = renderer
        .create(
          <RelatedArticles
            {...createRelatedArticlesProps(
              oneLeadAndTwoRelatedArticleFixture.data
            )}
          />
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
};
