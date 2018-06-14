/* eslint-disable react/prop-types */

import "react-native";
import React from "react";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { MockedProvider } from "@times-components/utils";
import Topic from "./src/topic";
import TopicProvider from "../provider/src/topic";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

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

const pageSize = 5;
const slug = "chelsea";

const getProps = decorateAction => ({
  adConfig,
  analyticsStream: storybookReporter,
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress"),
  page: 1,
  pageSize,
  slug
});

const mocks = fixtureGenerator.makeTopicArticleMocks({
  withImages: true,
  pageSize
});

export default {
  name: "Pages/Topic",
  children: [
    {
      type: "story",
      name: "Default",
      component: (_, { decorateAction }) => (
        <StorybookProvider mocks={mocks}>
          <TopicProvider debounceTimeMs={0} slug={slug}>
            {({ topic, error, isLoading }) => (
              <Topic
                {...getProps(decorateAction)}
                topic={topic}
                error={error}
                isLoading={isLoading}
              />
            )}
          </TopicProvider>
        </StorybookProvider>
      )
    },
    {
      type: "story",
      name: "Loading",
      component: (_, { decorateAction }) => (
        <MockedProvider mocks={mocks}>
          <Topic {...getProps(decorateAction)} isLoading />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "With an error getting Topic",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeMocksWithTopicError({
            pageSize,
            slug,
            withImages: true
          })}
        >
          <TopicProvider debounceTimeMs={0} slug={slug}>
            {({ topic, error, isLoading, refetch }) => (
              <Topic
                {...getProps(decorateAction)}
                topic={topic}
                error={error}
                isLoading={isLoading}
                refetch={refetch}
              />
            )}
          </TopicProvider>
        </MockedProvider>
      )
    }
  ]
};
