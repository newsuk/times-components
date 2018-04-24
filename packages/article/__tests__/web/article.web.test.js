import "jest-styled-components";
import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import ArticleRow from "../../src/article-body/article-body-row";
import ArticleLink from "../../src/article-body/article-link";
import Article from "../../src/article";
import shared from "../shared";
import sharedTracking from "../shared-tracking";

import articleFixtureNoLeadAsset from "../../fixtures/no-lead-asset.json";

jest.mock("@times-components/article-byline", () => "MockArticleByline");
jest.mock("@times-components/article-flag", () => ({
  ExclusiveArticleFlag: "MockExclusiveArticleFlag",
  NewArticleFlag: "MockNewArticleFlag",
  UpdatedArticleFlag: "MockUpdatedArticleFlag",
  SponsoredArticleFlag: "MockSponsoredArticleFlag"
}));
jest.mock("@times-components/article-label", () => "MockArticleLabel");
jest.mock("@times-components/video-label", () => "MockVideoLabel");
jest.mock("@times-components/brightcove-video", () => "MockBrightcoveVideo");
jest.mock("@times-components/article-image", () => "MockArticleImage");
jest.mock("@times-components/pull-quote", () => "MockPullQuote");
jest.mock("@times-components/related-articles", () => "MockRelatedArticles");
jest.mock("@times-components/topics", () => "MockTopics");
jest.mock("@times-components/watermark", () => "MockWatermark");
jest.mock("@times-components/tracking", () => {
  const mockTracking = component => component;
  return {
    withTrackingContext: mockTracking
  };
});

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
describe("Article tests on web", () => {
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

jest.unmock("@times-components/tracking");

describe("Article Tracking tests on web", () => {
  sharedTracking();
});
