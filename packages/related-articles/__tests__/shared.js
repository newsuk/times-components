import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import RelatedArticles from "../related-articles";

const singleRelatedArticleFixture = require("../fixtures/related-article.json");
const singleRelatedArticleNoImageFixture = require("../fixtures/related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("../fixtures/related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("../fixtures/related-article-no-byline.json");

const createProps = fixtureData => ({
  ...fixtureData.relatedArticles[0],
  template: fixtureData.relatedArticlesTemplate,
  onPress: () => {}
});

module.exports = () => {
  it("renders single default related article", () => {
    const tree = renderer
      .create(
        <RelatedArticles
          item={createProps(singleRelatedArticleFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single default related article with no lead image", () => {
    const tree = renderer
      .create(
        <RelatedArticles
          item={createProps(singleRelatedArticleNoImageFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single default related article with no label", () => {
    const tree = renderer
      .create(
        <RelatedArticles
          item={createProps(singleRelatedArticleNoLabelFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single default related article with no byline", () => {
    const tree = renderer
      .create(
        <RelatedArticles
          item={createProps(singleRelatedArticleNoBylineFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
