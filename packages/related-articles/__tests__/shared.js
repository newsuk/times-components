import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import RelatedArticles from "../related-articles";

const singleRelatedArticleFixture = require("../fixtures/related-article.json");
const singleRelatedArticleNoImageFixture = require("../fixtures/related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("../fixtures/related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("../fixtures/related-article-no-byline.json");

module.exports = () => {
  it("renders single default related article", () => {
    const props = {
      ...singleRelatedArticleFixture.data.article,
      onPress: () => {}
    };
    const tree = renderer
      .create(<RelatedArticles item={props} analyticsStream={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single default related article with no lead image", () => {
    const props = {
      ...singleRelatedArticleNoImageFixture.data.article,
      onPress: () => {}
    };
    const tree = renderer
      .create(<RelatedArticles item={props} analyticsStream={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single default related article with no label", () => {
    const props = {
      ...singleRelatedArticleNoLabelFixture.data.article,
      onPress: () => {}
    };
    const tree = renderer
      .create(<RelatedArticles item={props} analyticsStream={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders single default related article with no byline", () => {
    const props = {
      ...singleRelatedArticleNoBylineFixture.data.article,
      onPress: () => {}
    };
    const tree = renderer
      .create(<RelatedArticles item={props} analyticsStream={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};
