import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "../article";

import fullArticleFixture from "../fixtures/full-article.json";
import articleFixtureNoLabel from "../fixtures/no-label.json";
import articleFixtureNoFlags from "../fixtures/no-flags.json";
import articleFixtureWithVideo from "../fixtures/article-with-video-asset.json";
import articleFixtureNoStandfirst from "../fixtures/no-standfirst.json";
import articleFixtureNoStandfirstNoLabel from "../fixtures/no-standfirst-no-label.json";
import articleFixtureNoStandfirstNoFlags from "../fixtures/no-standfirst-no-flags.json";
import articleFixtureNoLabelNoFlags from "../fixtures/no-label-no-flags.json";
import articleFixtureNoLabelNoFlagsNoStandFirst from "../fixtures/no-label-no-flags-no-standfirst.json";

export default () => {
  const realIntl = Intl;

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

  beforeEach(() => {
    global.Intl = {
      DateTimeFormat: () => ({
        resolvedOptions: () => ({ timeZone: "Europe/London" })
      })
    };
  });

  afterEach(() => {
    global.Intl = realIntl;
  });

  it("renders activity indicator ", () => {
    const tree = renderer
      .create(
        <Article
          isLoading
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders an error", () => {
    const props = {
      error: { message: "An example error." }
    };

    const tree = renderer.create(
      <Article
        {...props}
        analyticsStream={() => {}}
        adConfig={adConfig}
        onRelatedArticlePress={() => {}}
        onAuthorPress={() => {}}
        onVideoPress={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("renders full article", () => {
    const tree = renderer
      .create(
        <Article
          {...fullArticleFixture.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoFlags.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no label", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabel.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirst.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirstNoFlags.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article no standfirst no label", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirstNoLabel.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabelNoFlags.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders article no label no flags no standfirst", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabelNoFlagsNoStandFirst.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders article with video asset", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureWithVideo.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("tracks page view", () => {
    const stream = jest.fn();
    renderer.create(
      <Article
        {...fullArticleFixture.data}
        analyticsStream={stream}
        adConfig={adConfig}
        onRelatedArticlePress={() => {}}
        onAuthorPress={() => {}}
        onVideoPress={() => {}}
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
        publishedTime: "2015-03-13T18:54:58.000Z"
      })
    });
  });
};
