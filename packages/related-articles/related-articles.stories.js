import { storiesOf } from "@storybook/react-native";
import React from "react";
import { ScrollView } from "react-native";
import { decorateAction } from "@storybook/addon-actions";
import storybookReporter from "@times-components/tealium-utils";
import RelatedArticles from "./src/related-articles";

import standard1RelatedArticleFixture from "./fixtures/standard/1-article.json";
import standard1RelatedArticleNoImageFixture from "./fixtures/standard/1-article-no-image.json";
import standard1RelatedArticleNoLabelFixture from "./fixtures/standard/1-article-no-label.json";
import standard1RelatedArticleNoBylineFixture from "./fixtures/standard/1-article-no-byline.json";
import standard2RelatedArticlesFixture from "./fixtures/standard/2-articles.json";
import standard3RelatedArticlesFixture from "./fixtures/standard/3-articles.json";
import leadAndTwo1RelatedArticleFixture from "./fixtures/leadandtwo/1-article.json";
import leadAndTwo2RelatedArticlesFixture from "./fixtures/leadandtwo/2-articles.json";
import leadAndTwo3RelatedArticlesFixture from "./fixtures/leadandtwo/3-articles.json";
import opinionAndTwo1RelatedArticleFixture from "./fixtures/opinionandtwo/1-article.json";
import opinionAndTwo2RelatedArticlesFixture from "./fixtures/opinionandtwo/2-articles.json";
import opinionAndTwo3RelatedArticlesFixture from "./fixtures/opinionandtwo/3-articles.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const createRelatedArticles = fixtureData => {
  const props = {
    analyticsStream: storybookReporter,
    articles: fixtureData.relatedArticles,
    mainId: fixtureData.relatedArticlesLayout.main,
    onPress: preventDefaultedAction("onArticlePress"),
    template: fixtureData.relatedArticlesLayout.template
  };
  return (
    <ScrollView>
      <RelatedArticles {...props} />
    </ScrollView>
  );
};

storiesOf("Composed/RelatedArticles", module)
  .add("Standard template with one related article", () =>
    createRelatedArticles(standard1RelatedArticleFixture.data)
  )
  .add("Standard template with one related article with no image", () =>
    createRelatedArticles(standard1RelatedArticleNoImageFixture.data)
  )
  .add("Standard template with one related article with no label", () =>
    createRelatedArticles(standard1RelatedArticleNoLabelFixture.data)
  )
  .add("Standard template with one related article with no byline", () =>
    createRelatedArticles(standard1RelatedArticleNoBylineFixture.data)
  )
  .add("Standard template with two related articles", () =>
    createRelatedArticles(standard2RelatedArticlesFixture.data)
  )
  .add("Standard template with three related articles", () =>
    createRelatedArticles(standard3RelatedArticlesFixture.data)
  )
  .add("Lead and two template with one related article", () =>
    createRelatedArticles(leadAndTwo1RelatedArticleFixture.data)
  )
  .add("Lead and two template with two related articles", () =>
    createRelatedArticles(leadAndTwo2RelatedArticlesFixture.data)
  )
  .add("Lead and two template with three related articles", () =>
    createRelatedArticles(leadAndTwo3RelatedArticlesFixture.data)
  )
  .add("Opinion and two template with one related article", () =>
    createRelatedArticles(opinionAndTwo1RelatedArticleFixture.data)
  )
  .add("Opinion and two template with two related articles", () =>
    createRelatedArticles(opinionAndTwo2RelatedArticlesFixture.data)
  )
  .add("Opinion and two template with three related articles", () =>
    createRelatedArticles(opinionAndTwo3RelatedArticlesFixture.data)
  );
