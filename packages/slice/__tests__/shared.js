import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Slice from "../slice";

const singleRelatedArticleFixture = require("../fixtures/single-related-article.json");
const singleRelatedArticleNoImageFixture = require("../fixtures/single-related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("../fixtures/single-related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("../fixtures/single-related-article-no-byline.json");

const createProps = fixtureData => ({
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

  it("renders single article", () => {
    const tree = renderer
      .create(
        <Slice
          item={createProps(singleRelatedArticleFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single article with no lead image", () => {
    const tree = renderer
      .create(
        <Slice
          item={createProps(singleRelatedArticleNoImageFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single article with no label", () => {
    const tree = renderer
      .create(
        <Slice
          item={createProps(singleRelatedArticleNoLabelFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single article with no byline", () => {
    const tree = renderer
      .create(
        <Slice
          item={createProps(singleRelatedArticleNoBylineFixture.data)}
          analyticsStream={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
