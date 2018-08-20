import React from "react";
import { ScrollView } from "react-native";
import storybookReporter from "@times-components/tealium-utils";
import RelatedArticles from "./src/related-articles";

import standard1RelatedArticleFixture from "./fixtures/standard/1-article";
import standard1RelatedArticleFixtureVideoLead from "./fixtures/standard/1-article-video-lead.json";
import standard1RelatedArticleNoImageFixture from "./fixtures/standard/1-article-no-image.json";
import standard1RelatedArticleNoLabelFixture from "./fixtures/standard/1-article-no-label.json";
import standard1RelatedArticleNoBylineFixture from "./fixtures/standard/1-article-no-byline.json";
import standard2RelatedArticlesFixture from "./fixtures/standard/2-articles";
import standard3RelatedArticlesFixture from "./fixtures/standard/3-articles";
import leadAndTwo1RelatedArticleFixture from "./fixtures/leadandtwo/1-article.js";
import leadAndTwo2RelatedArticlesFixture from "./fixtures/leadandtwo/2-articles.js";
import leadAndTwo3RelatedArticlesFixture from "./fixtures/leadandtwo/3-articles.js";
import opinionAndTwo1RelatedArticleFixture from "./fixtures/opinionandtwo/1-article.js";
import opinionAndTwo2RelatedArticlesFixture from "./fixtures/opinionandtwo/2-articles.js";
import opinionAndTwo3RelatedArticlesFixture from "./fixtures/opinionandtwo/3-articles.js";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const createRelatedArticles = (decorateAction, fixtureData) => {
  const { relatedArticleSlice } = fixtureData;
  const props = {
    analyticsStream: storybookReporter,
    onPress: preventDefaultedAction(decorateAction)("onArticlePress"),
    slice: relatedArticleSlice
  };
  return (
    <ScrollView>
      <RelatedArticles {...props} />
    </ScrollView>
  );
};

export default {
  name: "Composed/RelatedArticles",
  children: [
    {
      type: "story",
      name: "Standard template with one related article",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard1RelatedArticleFixture().data
        )
    },
    {
      type: "story",
      name: "Standard template with one related article with video lead",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard1RelatedArticleFixtureVideoLead.data
        )
    },
    {
      type: "story",
      name: "Standard template with one related article with no image",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard1RelatedArticleNoImageFixture.data
        )
    },
    {
      type: "story",
      name: "Standard template with one related article with no label",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard1RelatedArticleNoLabelFixture.data
        )
    },
    {
      type: "story",
      name: "Standard template with one related article with no byline",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard1RelatedArticleNoBylineFixture.data
        )
    },
    {
      type: "story",
      name: "Standard template with two related articles",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard2RelatedArticlesFixture().data
        )
    },
    {
      type: "story",
      name: "Standard template with three related articles",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          standard3RelatedArticlesFixture().data
        )
    },
    {
      type: "story",
      name: "Lead and two template with one related article",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          leadAndTwo1RelatedArticleFixture().data
        )
    },
    {
      type: "story",
      name: "Lead and two template with two related articles",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          leadAndTwo2RelatedArticlesFixture().data
        )
    },
    {
      type: "story",
      name: "Lead and two template with three related articles",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          leadAndTwo3RelatedArticlesFixture().data
        )
    },
    {
      type: "story",
      name: "Opinion and two template with one related article",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          opinionAndTwo1RelatedArticleFixture().data
        )
    },
    {
      type: "story",
      name: "Opinion and two template with two related articles",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          opinionAndTwo2RelatedArticlesFixture().data
        )
    },
    {
      type: "story",
      name: "Opinion and two template with three related articles",
      component: (_, { decorateAction }) =>
        createRelatedArticles(
          decorateAction,
          opinionAndTwo3RelatedArticlesFixture().data
        )
    }
  ]
};
