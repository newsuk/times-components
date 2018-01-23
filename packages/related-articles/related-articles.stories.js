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

storiesOf("Related Articles", module)
  .add("Single article default", () => {
    const props = {
      ...singleRelatedArticleFixture.data.relatedArticles[0],
      template: singleRelatedArticleFixture.data.relatedArticlesTemplate,
      onPress: preventDefaultedAction("onArticlePress")
    };

    return <RelatedArticles item={props} />;
  })
  .add("Single article with no lead image", () => {
    const props = {
      ...singleRelatedArticleNoImageFixture.data.relatedArticles[0],
      template: singleRelatedArticleNoImageFixture.data.relatedArticlesTemplate,
      onPress: preventDefaultedAction("onArticlePress")
    };

    return <RelatedArticles item={props} />;
  })
  .add("Single article with no label", () => {
    const props = {
      ...singleRelatedArticleNoLabelFixture.data.relatedArticles[0],
      template: singleRelatedArticleNoLabelFixture.data.relatedArticlesTemplate,
      onPress: preventDefaultedAction("onArticlePress")
    };

    return <RelatedArticles item={props} />;
  })
  .add("Single article with no byline", () => {
    const props = {
      ...singleRelatedArticleNoBylineFixture.data.relatedArticles[0],
      template:
        singleRelatedArticleNoBylineFixture.data.relatedArticlesTemplate,
      onPress: preventDefaultedAction("onArticlePress")
    };

    return <RelatedArticles item={props} />;
  });
