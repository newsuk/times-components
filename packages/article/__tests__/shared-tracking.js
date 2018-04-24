import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "../src/article";

import fullArticleFixture from "../fixtures/full-article.json";

const adConfig = {
  networkId: "mockNetwork",
  adUnit: "mockAdUnit",
  pageTargeting: {
    title: "Title"
  },
  slotTargeting: {
    path: "/news"
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

export default () => {
    it("should track page view", () => {
        const stream = jest.fn();

        const { topics } = fullArticleFixture.data.article;
        renderer.create(
          <Article
            {...fullArticleFixture.data}
            analyticsStream={stream}
            adConfig={adConfig}
            onRelatedArticlePress={() => {}}
            onAuthorPress={() => {}}
            onVideoPress={() => {}}
            onLinkPress={() => {}}
          />
        );
        expect(stream).toHaveBeenCalledWith({
          object: "Article",
          component: "Page",
          action: "Viewed",
          attrs: expect.objectContaining({
            headline:
              "Caribbean islands devastated by Hurricane Irma, the worst Atlantic storm on record",
            byline:
              "Rosemary Bennett, Education Editor | Nicola Woolcock, Education Correspondent",
            publishedTime: "2015-03-13T18:54:58.000Z",
            topics
          })
        });
      });
};
