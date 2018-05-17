/* eslint-disable react/prop-types */

import "react-native";
import React from "react";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { fixtureGenerator } from "@times-components/provider-test-tools";

import Topic from "./src/topic";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const topicHeadDescription =
  "Animals are multicellular eukaryotic organisms that form the biological kingdom Animalia. With few  exceptions, animals consume organic materials.";
const pageSize = 5;

const props = {
  analyticsStream: storybookReporter,
  name: "Animals",
  onArticlePress: preventDefaultedAction(decorateAction)(
    "onArticlePress"
  ),
  page: 1,
  pageSize,
  slug: "chelsea",
  topic: {
    name: "Chelsea",
    description: "A swanky part of town."
  }
};

export default {
  name: "Pages/Topic",
  children: [
    {
      type: "story",
      name: "Default",
      component: (_, { decorateAction, text }) => {
        const mocks = fixtureGenerator.makeTopicArticleMocks({
          withImages: true,
          pageSize
        });

        return (
          <StorybookProvider mocks={mocks}>
            <Topic
              {...props}
              description={text("Topic head description:", topicHeadDescription)}
            />
          </StorybookProvider>
        );
      }
    },
    {
      type: "story",
      name: "Loading",
      component: () => <Topic {...props} isLoading />
    }
  ]
};
