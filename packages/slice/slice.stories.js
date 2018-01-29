import React from "react";
import { storiesOf } from "dextrose/storiesOfOverloader";
import { decorateAction } from "@storybook/addon-actions";
import Slice from "./slice";

const singleRelatedArticleFixture = require("./fixtures/single-related-article.json");
const singleRelatedArticleNoImageFixture = require("./fixtures/single-related-article-no-image.json");
const singleRelatedArticleNoLabelFixture = require("./fixtures/single-related-article-no-label.json");
const singleRelatedArticleNoBylineFixture = require("./fixtures/single-related-article-no-byline.json");

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

storiesOf("Slice", module)
  .add("Single related article default", () => (
    <Slice item={createProps(singleRelatedArticleFixture.data)} />
  ))
  .add("Single related article with no lead image", () => (
    <Slice item={createProps(singleRelatedArticleNoImageFixture.data)} />
  ))
  .add("Single related article with no label", () => (
    <Slice item={createProps(singleRelatedArticleNoLabelFixture.data)} />
  ))
  .add("Single related article with no byline", () => (
    <Slice item={createProps(singleRelatedArticleNoBylineFixture.data)} />
  ));
