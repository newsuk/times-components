/* eslint-env browser */
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Platform, ScrollView } from "react-native";
import { addTypenameToDocument } from "apollo-utilities";

import { decorateAction } from "@storybook/addon-actions";
import { ArticleProvider } from "@times-components/provider";
import { MockedProvider } from "@times-components/utils/graphql";
import { query as articleQuery } from "@times-components/provider/article";
import storybookReporter from "@times-components/tealium/storybook";
import Article from "./article";
import RelatedArticles from "./related-articles/related-articles";

import fullArticleTypenameFixture from "./fixtures/full-article-typename.json";
import fullArticleFixture from "./fixtures/full-article.json";
import fullLongArticleFixture from "./fixtures/full-long-article.json";
import articleWithVideoFixture from "./fixtures/article-with-video-asset.json";
import articleFixtureNoStandfirst from "./fixtures/no-standfirst.json";
import articleFixtureNoLabel from "./fixtures/no-label.json";
import articleFixtureNoAds from "./fixtures/no-ads.json";
import articleFixtureNoFlags from "./fixtures/no-flags.json";
import articleFixtureNoStandfirstNoLabel from "./fixtures/no-standfirst-no-label.json";
import articleFixtureNoStandfirstNoFlags from "./fixtures/no-standfirst-no-flags.json";
import articleFixtureNoLabelNoFlags from "./fixtures/no-label-no-flags.json";
import articleFixtureNoLabelNoFlagsNoStandFirst from "./fixtures/no-label-no-flags-no-standfirst.json";
import articleFixtureNoLeadAsset from "./fixtures/no-lead-asset.json";
// Related articles
import standard1RelatedArticleFixture from "./related-articles/fixtures/standard/1-article.json";
import standard1RelatedArticleNoImageFixture from "./related-articles/fixtures/standard/1-article-no-image.json";
import standard1RelatedArticleNoLabelFixture from "./related-articles/fixtures/standard/1-article-no-label.json";
import standard1RelatedArticleNoBylineFixture from "./related-articles/fixtures/standard/1-article-no-byline.json";
import standard2RelatedArticlesFixture from "./related-articles/fixtures/standard/2-articles.json";
import standard3RelatedArticlesFixture from "./related-articles/fixtures/standard/3-articles.json";
import leadAndTwo1RelatedArticleFixture from "./related-articles/fixtures/leadandtwo/1-article.json";
import leadAndTwo2RelatedArticlesFixture from "./related-articles/fixtures/leadandtwo/2-articles.json";
import leadAndTwo3RelatedArticlesFixture from "./related-articles/fixtures/leadandtwo/3-articles.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const createRelatedArticlesProps = fixtureData => ({
  analyticsStream: storybookReporter,
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
  mainId:
    fixtureData.relatedArticlesLayout.lead ||
    fixtureData.relatedArticlesLayout.opinion ||
    "",
  onPress: preventDefaultedAction("onArticlePress")
});

const mocks = [
  {
    request: {
      query: addTypenameToDocument(articleQuery),
      variables: {
        id: "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
      }
    },
    result: fullArticleTypenameFixture
  }
];

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

storiesOf("Pages/Article", module)
  .add("Default", () => {
    const props = {
      ...fullArticleFixture.data,
      isLoading: false,
      analyticsStream: storybookReporter,
      adConfig
    };

    return <Article {...props} />;
  })
  .add("Article with video asset", () => {
    const props = {
      ...articleWithVideoFixture.data,
      isLoading: false,
      analyticsStream: storybookReporter,
      adConfig
    };

    return <Article {...props} />;
  })
  .add("Long Article", () => {
    const props = {
      ...fullLongArticleFixture.data,
      isLoading: false,
      analyticsStream: storybookReporter,
      adConfig
    };

    return <Article {...props} />;
  })
  .add("Loading", () => {
    const props = {
      analyticsStream: storybookReporter,
      isLoading: true,
      adConfig
    };

    return <Article {...props} />;
  })
  .add("Error", () => {
    const props = {
      analyticsStream: storybookReporter,
      error: { message: "An example error." }
    };

    return <Article {...props} />;
  })
  .add("With Provider", () => (
    <MockedProvider mocks={mocks}>
      <ArticleProvider
        id="198c4b2f-ecec-4f34-be53-c89f83bc1b44"
        debounceTimeMs={0}
      >
        {({ article, isLoading, error }) => (
          <Article
            article={article}
            isLoading={isLoading}
            error={error}
            analyticsStream={storybookReporter}
            adConfig={adConfig}
          />
        )}
      </ArticleProvider>
    </MockedProvider>
  ))
  .add("Fixtures - Full", () => {
    // Hack, render ads inside storybook's iframe
    if (Platform.OS === "web") {
      return (
        <div>
          <a
            href={`/iframe.html${window.top.location.search}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to render the ads
          </a>
          <Article
            {...fullArticleFixture.data}
            analyticsStream={storybookReporter}
            adConfig={adConfig}
          />
        </div>
      );
    }

    return (
      <Article
        {...fullArticleFixture.data}
        analyticsStream={storybookReporter}
        adConfig={adConfig}
      />
    );
  })
  .add("Fixtures - No ads", () => (
    <Article
      {...articleFixtureNoAds.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No standfirst", () => (
    <Article
      {...articleFixtureNoStandfirst.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No label", () => (
    <Article
      {...articleFixtureNoLabel.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No flags", () => (
    <Article
      {...articleFixtureNoFlags.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No standfirst, no label", () => (
    <Article
      {...articleFixtureNoStandfirstNoLabel.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No standfirst, no flags", () => (
    <Article
      {...articleFixtureNoStandfirstNoFlags.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No label, no flags", () => (
    <Article
      {...articleFixtureNoLabelNoFlags.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No label, no flags, no standfirst", () => (
    <Article
      {...articleFixtureNoLabelNoFlagsNoStandFirst.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Fixtures - No lead asset", () => (
    <Article
      {...articleFixtureNoLeadAsset.data}
      analyticsStream={storybookReporter}
      adConfig={adConfig}
    />
  ))
  .add("Default template with one related article", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(standard1RelatedArticleFixture.data)}
      />
    </ScrollView>
  ))
  .add("Default template with one related article with no lead image", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(
          standard1RelatedArticleNoImageFixture.data
        )}
      />
    </ScrollView>
  ))
  .add("Default template with one related article with no label", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(
          standard1RelatedArticleNoLabelFixture.data
        )}
      />
    </ScrollView>
  ))
  .add("Default template with one related article with no byline", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(
          standard1RelatedArticleNoBylineFixture.data
        )}
      />
    </ScrollView>
  ))
  .add("Default template with two related articles", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(standard2RelatedArticlesFixture.data)}
      />
    </ScrollView>
  ))
  .add("Default template with three related articles", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(standard3RelatedArticlesFixture.data)}
      />
    </ScrollView>
  ))
  .add("Lead and two template with one related article", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo1RelatedArticleFixture.data)}
      />
    </ScrollView>
  ))
  .add("Lead and two template with two related articles", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo2RelatedArticlesFixture.data)}
      />
    </ScrollView>
  ))
  .add("Lead and two template with three related articles", () => (
    <ScrollView>
      <RelatedArticles
        {...createRelatedArticlesProps(leadAndTwo3RelatedArticlesFixture.data)}
      />
    </ScrollView>
  ));
