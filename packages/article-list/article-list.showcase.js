import { Text, View } from "react-native";
import React from "react";
import { ApolloError } from "apollo-client";
import articleListNoImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-no-images.json";
import articleListWithImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-with-images.json";
import storybookReporter from "@times-components/tealium-utils";
import { withTrackingContext } from "@times-components/tracking";
import ArticleList, { ArticleListPageError } from "./src/article-list";
import adConfig from "./fixtures/article-ad-config.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  articles: articleListWithImagesFixture.data.author.articles.list,
  count: articleListWithImagesFixture.data.author.articles.list.length,
  emptyStateMessage:
    "Unfortunately, there are no articles relating to this page",
  fetchMore: () => Promise.resolve(),
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
          articles={articleListNoImagesFixture.data.author.articles.list}
          count={articleListNoImagesFixture.data.author.articles.list.length}
          showImages={false}
        />
      )
    },
    {
      type: "story",
      name: "With a header",
      component: (_, { decorateAction }) => {
        const ArticleListHeader = (
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#999",
              height: 100,
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Text style={{ color: "#FFF" }}>Article List Header</Text>
          </View>
        );

        return (
          <TrackedArticleList
            {...getProps(decorateAction)}
            articleListHeader={ArticleListHeader}
          />
        );
      }
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
          adConfig={adConfig}
          analyticsStream={storybookReporter}
          error={new ApolloError("Some Error")}
          refetch={preventDefaultedAction(decorateAction)("refetch")}
        />
      )
    },
    {
      type: "story",
      name: "Empty article list",
      component: (_, { decorateAction }) => (
        <TrackedArticleList {...getProps(decorateAction)} articles={[]} />
      )
    }
  ]
};
