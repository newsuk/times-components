/* eslint-disable react/prop-types */
import React from "react";
import {
  fixtureGenerator,
  MockedProvider
} from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import Topic from "./src/topic";
import TopicProvider from "../provider/src/topic";
import adConfig from "./fixtures/topic-ad-config.json";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const pageSize = 20;
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
        <MockedProvider mocks={mocks} isLoading>
          <Topic {...getProps(decorateAction)} isLoading />
        </MockedProvider>
      )
    },
    {
      type: "story",
      name: "Empty State",
      component: (_, { decorateAction }) => (
        <MockedProvider
          mocks={fixtureGenerator.makeTopicArticleMocks({ empty: true })}
        >
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
