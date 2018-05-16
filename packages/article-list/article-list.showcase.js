import "react-native";
import React from "react";
import storybookReporter from "@times-components/tealium-utils";
import { withTrackingContext } from "@times-components/tracking";
import articleListNoImagesFixture from "./fixtures/article-list-no-images.json";
import articleListWithImagesFixture from "./fixtures/article-list-with-images.json";
import ArticleList, { ArticleListPageError } from "./src/article-list";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const getProps = decorateAction => ({
  analyticsStream: storybookReporter,
  articles: articleListWithImagesFixture.data.articles.list,
  count: articleListWithImagesFixture.data.articles.list.length,
  imageRatio: 3 / 2,
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress"),
  onNext: preventDefaultedAction(decorateAction)("onNext"),
  onPrev: preventDefaultedAction(decorateAction)("onPrev"),
  page: 1,
  pageSize: 3,
  refetch: preventDefaultedAction(decorateAction)("refetch")
});

const TrackedArticleList = withTrackingContext(ArticleList, {
  trackingObjectName: "ArticleList"
});

export default {
  name: "Composed/Article List",
  children: [
    {
      type: "story",
      name: "Default with images",
      component: (_, { decorateAction }) => (
        <TrackedArticleList {...getProps(decorateAction)} />
      )
    },
    {
      type: "story",
      name: "Default without images",
      component: (_, { decorateAction }) => (
        <TrackedArticleList
          {...getProps(decorateAction)}
          articles={articleListNoImagesFixture.data.articles.list}
          count={articleListNoImagesFixture.data.articles.list.length}
          showImages={false}
        />
      )
    },
    {
      type: "story",
      name: "Loading articles",
      component: (_, { decorateAction }) => (
        <TrackedArticleList {...getProps(decorateAction)} articlesLoading />
      )
    },
    {
      type: "story",
      name: "Error getting page-level data",
      component: (_, { decorateAction }) => (
        <ArticleListPageError
          refetch={preventDefaultedAction(decorateAction)("refetch")}
        />
      )
    },
    {
      type: "story",
      name: "Error getting article list data",
      component: (_, { decorateAction }) => (
        <TrackedArticleList
          analyticsStream={storybookReporter}
          error
          refetch={preventDefaultedAction(decorateAction)("refetch")}
        />
      )
    }
  ]
};
