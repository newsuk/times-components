import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import Article from "../src/article";

import fullArticleFixture from "../fixtures/full-article.json";
import shortArticleFixture from "../fixtures/short-article.json";
import articleFixtureNoLabel from "../fixtures/no-label.json";
import articleFixtureNoFlags from "../fixtures/no-flags.json";
import articleFixtureNoByline from "../fixtures/no-byline.json";
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

  it("should render activity indicator ", () => {
    const tree = renderer
      .create(
        <Article
          isLoading
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an error", () => {
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
        onLinkPress={() => {}}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should render a full article", () => {
    const tree = renderer
      .create(
        <Article
          {...fullArticleFixture.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render a smaller article", () => {
    const tree = renderer
      .create(
        <Article
          {...shortArticleFixture.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoFlags.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no byline", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoByline.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no label", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabel.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no standfirst", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirst.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no standfirst and no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirstNoFlags.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no standfirst and no label", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoStandfirstNoLabel.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no label and no flags", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabelNoFlags.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with no label, no flags and no standfirst", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureNoLabelNoFlagsNoStandFirst.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render an article with a video asset", () => {
    const tree = renderer
      .create(
        <Article
          {...articleFixtureWithVideo.data}
          analyticsStream={() => {}}
          adConfig={adConfig}
          onRelatedArticlePress={() => {}}
          onAuthorPress={() => {}}
          onVideoPress={() => {}}
          onLinkPress={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

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
