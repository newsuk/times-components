import { Text, View } from "react-native";
import React from "react";
import articleListNoImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-no-images.json";
import articleListWithImagesFixture from "@times-components/provider-test-tools/fixtures/author-profile/article-list-with-images.json";
import storybookReporter from "@times-components/tealium-utils";
import { withTrackingContext } from "@times-components/tracking";
import ArticleList, { ArticleListPageError } from "./src/article-list";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const adConfig = {
  networkId: "25436805",
  adUnit: "d.thetimes.co.uk",
  pageTargeting: {
    title: "Title",
    label: "Label"
  },
  slotTargeting: {
    path: "/news",
    sec_id: "null",
    section: "news",
    zone: "current_edition",
    slot: "news"
  },
  biddersConfig: {
    timeout: 3000,
    minPrice: 0.01,
    maxBid: 15,
    bucketSize: 0.25,
    bidders: {
      appnexus: {
        placementId: "5823281"
      },
      rubicon: {
        accountId: "14062",
        siteId: "70608",
        zoneId: "335918"
      },
      amazon: {
        accountId: "3360"
      },
      criteo: {
        zoneMap: {
          "120x600": "764877"
        }
      },
      pubmatic: {
        accountId: "156034",
        adSlotPrefix: "Thetimes"
      },
      indexExchange: {
        siteId: "188830"
      }
    }
  },
  bidderSlots: ["ad-header", "ad-article-inline"]
};

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  articles: articleListWithImagesFixture.data.author.articles.list,
  count: articleListWithImagesFixture.data.author.articles.list.length,
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
          analyticsStream={storybookReporter}
          error
          refetch={preventDefaultedAction(decorateAction)("refetch")}
        />
      )
    }
  ]
};
