/* eslint-disable react/prop-types */

import "react-native";
import React from "react";
import { fixtureGenerator } from "@times-components/provider-test-tools";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { MockedProvider } from "@times-components/utils";

import Topic from "./src/topic";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const pageSize = 5;

const getProps = decorateAction => ({
  analyticsStream: storybookReporter,
  isLoading: false,
  name: "Animals",
  onArticlePress: preventDefaultedAction(decorateAction)("onArticlePress"),
  page: 1,
  pageSize,
  slug: "chelsea",
  topic: {
    name: "Chelsea",
    description: "A swanky part of town."
  }
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
          <Topic {...getProps(decorateAction)} />
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
    }
  ]
};
