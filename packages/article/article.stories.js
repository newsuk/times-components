/* eslint-env browser */
import { storiesOf } from "@storybook/react-native";
import React from "react";
import { Platform } from "react-native";
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
import oneDefaultRelatedArticleFixture from "./related-articles/fixtures/default/one-default.json";
import oneDefaultRelatedArticleNoImageFixture from "./related-articles/fixtures/default/one-no-image.json";
import oneDefaultRelatedArticleNoLabelFixture from "./related-articles/fixtures/default/one-no-label.json";
import oneDefaultRelatedArticleNoBylineFixture from "./related-articles/fixtures/default/one-no-byline.json";
import twoDefaultRelatedArticlesFixture from "./related-articles/fixtures/default/two-default.json";
import threeDefaultRelatedArticlesFixture from "./related-articles/fixtures/default/three-default.json";
import oneLeadAndTwoRelatedArticleFixture from "./related-articles/fixtures/lead-and-two/one-default.json";
import twoLeadAndTwoRelatedArticleFixture from "./related-articles/fixtures/lead-and-two/two-default.json";
import threeLeadAndTwoRelatedArticleFixture from "./related-articles/fixtures/lead-and-two/three-default.json";

const preventDefaultedAction = decorateAction([
  ([e, ...args]) => {
    e.preventDefault();
    return ["[SyntheticEvent (storybook prevented default)]", ...args];
  }
]);

const createRelatedArticlesProps = fixtureData => ({
  articles: fixtureData.relatedArticles,
  template: fixtureData.relatedArticlesLayout.template,
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
    path: "/news"
  }
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
  .add("One DEFAULT related article", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(oneDefaultRelatedArticleFixture.data)}
    />
  ))
  .add("One DEFAULT related article with no lead image", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(
        oneDefaultRelatedArticleNoImageFixture.data
      )}
    />
  ))
  .add("One DEFAULT related article with no label", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(
        oneDefaultRelatedArticleNoLabelFixture.data
      )}
    />
  ))
  .add("One DEFAULT related article with no byline", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(
        oneDefaultRelatedArticleNoBylineFixture.data
      )}
    />
  ))
  .add("Two DEFAULT related articles", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(twoDefaultRelatedArticlesFixture.data)}
    />
  ))
  .add("Three DEFAULT related articles", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(threeDefaultRelatedArticlesFixture.data)}
    />
  ))
  .add("One LEAD_AND_TWO related article", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(oneLeadAndTwoRelatedArticleFixture.data)}
    />
  ))
  .add("Two LEAD_AND_TWO related articles", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(twoLeadAndTwoRelatedArticleFixture.data)}
    />
  ))
  .add("Three LEAD_AND_TWO related articles", () => (
    <RelatedArticles
      {...createRelatedArticlesProps(threeLeadAndTwoRelatedArticleFixture.data)}
    />
  ));
