import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { decorateAction } from "@storybook/addon-actions";
import RelatedArticles from "./related-articles";

const singleRelatedArticleFixture = require("./fixtures/related-article.json");
const singleRelatedArticleNoImageFixture = require("./fixtures/related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("./fixtures/related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("./fixtures/related-article-no-byline.json");

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const createProps = fixtureData => ({
  ...fixtureData.relatedArticles[0],
  template: fixtureData.relatedArticlesTemplate,
  onPress: preventDefaultedAction("onArticlePress")
});

storiesOf("Related Articles", module)
  .add("Single article default", () => (
    <RelatedArticles item={createProps(singleRelatedArticleFixture.data)} />
  ))
  .add("Single article with no lead image", () => (
    <RelatedArticles
      item={createProps(singleRelatedArticleNoImageFixture.data)}
    />
  ))
  .add("Single article with no label", () => (
    <RelatedArticles
      item={createProps(singleRelatedArticleNoLabelFixture.data)}
    />
  ))
  .add("Single article with no byline", () => (
    <RelatedArticles
      item={createProps(singleRelatedArticleNoBylineFixture.data)}
    />
  ));
