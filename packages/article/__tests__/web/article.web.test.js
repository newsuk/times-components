import "jest-styled-components";
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ArticleRow from "../../src/article-body/article-body-row";
import ArticleLink from "../../src/article-body/article-link";
import Article from "../../src/article";
import shared from "../shared";

const articleFixtureNoLeadAsset = require("../../fixtures/no-lead-asset.json");

describe("Article tests on web", () => {
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
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ArticleRow should handle a link onPress", () => {
    const testUrl = "http://www.test.com";
    const props = {
      content: {
        data: {
          attributes: {
            href: testUrl
          },
          children: [
            {
              name: "text",
              attributes: {
                value: "police disclosure of evidence"
              },
              children: []
            }
          ],
          name: "link"
        },
        index: 1
      }
    };
    const onPressMock = jest.fn();
    const component = mount(
      <ArticleRow {...props} onLinkPress={onPressMock} />
    );
    const eventObject = { event: true };
    component
      .find(ArticleLink)
      .props()
      .onPress(eventObject);
    expect(onPressMock).toHaveBeenCalledWith(eventObject, { href: testUrl });
  });
});
