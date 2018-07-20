import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { iterator } from "@times-components/test-utils";
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
  const realIntl = Intl;

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

  const tests = [
    {
      name: "article",
      test: async () => {
        const props = {
          error: { message: "An example error." }
        };

        const tree = renderer.create(
          <Article
            {...props}
            adConfig={adConfig}
            analyticsStream={() => {}}
            onAuthorPress={() => {}}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "full article",
      test: async () => {
        const tree = shallow(
          <Article
            {...fullArticleFixture.data}
            adConfig={adConfig}
            analyticsStream={() => {}}
            onAuthorPress={() => {}}
            onLinkPress={() => {}}
            onRelatedArticlePress={() => {}}
            onTopicPress={() => {}}
            onVideoPress={() => {}}
          />
        );

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "smaller article",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...shortArticleFixture.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no flags",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoFlags.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no byline",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoByline.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no label",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoLabel.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no standfirst",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoStandfirst.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no standfirst and no flags",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoStandfirstNoFlags.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no standfirst and no label",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoStandfirstNoLabel.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no flags and no label",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoLabelNoFlags.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with no standfirst, no label and no no flags",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureNoLabelNoFlagsNoStandFirst.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    },
    {
      name: "article with a video asset",
      test: async () => {
        const tree = renderer
          .create(
            <Article
              {...articleFixtureWithVideo.data}
              adConfig={adConfig}
              analyticsStream={() => {}}
              onAuthorPress={() => {}}
              onLinkPress={() => {}}
              onRelatedArticlePress={() => {}}
              onTopicPress={() => {}}
              onVideoPress={() => {}}
            />
          )
          .toJSON();

        expect(tree).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};

export { adConfig };
