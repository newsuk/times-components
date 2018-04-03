import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Article from "../../article";
import shared from "../shared";

const articleFixtureNoLeadAsset = require("../../../fixtures/no-lead-asset.json");

describe("Article test on web", () => {
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

  shared();

  it("renders article with no lead asset", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLeadAsset.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
