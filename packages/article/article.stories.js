/* eslint-env browser */
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Platform } from "react-native";
import { addTypenameToDocument } from "apollo-utilities";

import { decorateAction } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs/react";
import { select } from "@times-components/storybook";
import { ArticleProvider, articleQuery } from "@times-components/provider";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import Article from "./src/article";

import fullArticleTypenameFixture from "./fixtures/full-article-typename.json";
import fullArticleFixture from "./fixtures/full-article.json";
import fullLongArticleFixture from "./fixtures/full-long-article.json";
import articleWithVideoFixture from "./fixtures/article-with-video-asset.json";
import articleFixtureBylineAuthor from "./fixtures/article-with-byline-author.json";
import articleFixtureNoStandfirst from "./fixtures/no-standfirst.json";
import articleFixtureNoLabel from "./fixtures/no-label.json";
import articleFixtureNoAds from "./fixtures/no-ads.json";
import articleFixtureNoFlags from "./fixtures/no-flags.json";
import articleFixtureNoStandfirstNoLabel from "./fixtures/no-standfirst-no-label.json";
import articleFixtureNoStandfirstNoFlags from "./fixtures/no-standfirst-no-flags.json";
import articleFixtureNoLabelNoFlags from "./fixtures/no-label-no-flags.json";
import articleFixtureNoLabelNoFlagsNoStandFirst from "./fixtures/no-label-no-flags-no-standfirst.json";
import articleFixtureNoLeadAsset from "./fixtures/no-lead-asset.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

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

const defaultAdConfig = {
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

/* eslint-disable react/prop-types */
const RenderArticle = ({
  fixture,
  isLoading = false,
  analyticsStream = storybookReporter,
  adConfig = defaultAdConfig,
  error
}) => {
  const data = fixture !== undefined ? fixture.data : {};

  return (
    <Article
      {...data}
      isLoading={isLoading}
      analyticsStream={analyticsStream}
      adConfig={adConfig}
      error={error}
      onRelatedArticlePress={preventDefaultedAction("onRelatedArticlePress")}
      onAuthorPress={preventDefaultedAction("onAuthorPress")}
      onVideoPress={preventDefaultedAction("onVideoPress")}
      onLinkPress={preventDefaultedAction("onLinkPress")}
    />
  );
};
/* eslint-enable */

storiesOf("Pages/Article", module)
  .add("Default", () => <RenderArticle fixture={fullArticleFixture} />)
  .add("Article with video asset", () => (
    <RenderArticle fixture={articleWithVideoFixture} />
  ))
  .add("Long Article", () => <RenderArticle fixture={fullLongArticleFixture} />)
  .add("Loading", () => <RenderArticle isLoading />)
  .add("Error", () => (
    <RenderArticle error={{ message: "An example error." }} />
  ))
  .add("With Provider", () => {
    const predefinedArticles = {
      "198c4b2f-ecec-4f34-be53-c89f83bc1b44": "Default article",
      "1a576df6-cb50-11e4-81dd-064fe933cd41":
        "Video lead asset (requires GraphQL with CI data)"
    };
    const predefinedArticle = select(
      "Predefined article",
      predefinedArticles,
      "198c4b2f-ecec-4f34-be53-c89f83bc1b44"
    );
    const overrideArticleId = text("Override article id", "");

    return (
      <StorybookProvider mocks={mocks}>
        <ArticleProvider
          id={overrideArticleId || predefinedArticle}
          debounceTimeMs={0}
        >
          {({ article, isLoading, error }) => (
            <Article
              article={article}
              isLoading={isLoading}
              error={error}
              analyticsStream={storybookReporter}
              adConfig={defaultAdConfig}
              onRelatedArticlePress={preventDefaultedAction(
                "onRelatedArticlePress"
              )}
              onAuthorPress={preventDefaultedAction("onAuthorPress")}
              onLinkPress={preventDefaultedAction("onLinkPress")}
            />
          )}
        </ArticleProvider>
      </StorybookProvider>
    );
  })
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
          <RenderArticle fixture={fullArticleFixture} />
        </div>
      );
    }

    return <RenderArticle fixture={fullArticleFixture} />;
  })
  .add("Fixtures - Byline with author profile", () => (
    <RenderArticle fixture={articleFixtureBylineAuthor} />
  ))
  .add("Fixtures - No ads", () => (
    <RenderArticle fixture={articleFixtureNoAds} />
  ))
  .add("Fixtures - No standfirst", () => (
    <RenderArticle fixture={articleFixtureNoStandfirst} />
  ))
  .add("Fixtures - No label", () => (
    <RenderArticle fixture={articleFixtureNoLabel} />
  ))
  .add("Fixtures - No flags", () => (
    <RenderArticle fixture={articleFixtureNoFlags} />
  ))
  .add("Fixtures - No standfirst, no label", () => (
    <RenderArticle fixture={articleFixtureNoStandfirstNoLabel} />
  ))
  .add("Fixtures - No standfirst, no flags", () => (
    <RenderArticle fixture={articleFixtureNoStandfirstNoFlags} />
  ))
  .add("Fixtures - No label, no flags", () => (
    <RenderArticle fixture={articleFixtureNoLabelNoFlags} />
  ))
  .add("Fixtures - No label, no flags, no standfirst", () => (
    <RenderArticle fixture={articleFixtureNoLabelNoFlagsNoStandFirst} />
  ))
  .add("Fixtures - No lead asset", () => (
    <RenderArticle fixture={articleFixtureNoLeadAsset} />
  ));
