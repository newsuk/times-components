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

const page = 1;
const pageSize = 5;
const slug = "chelsea";

export default {
  name: "Pages/Topic",
  children: [
    {
      type: "story",
      name: "Default",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          slug,
          page,
          pageSize,
          topic: {
            name: "Chelsea",
            description: "A swanky part of town."
          }
        };

        const mocks = fixtureGenerator.makeTopicArticleMocks({
          withImages: true,
          pageSize
        });

        return (
          <StorybookProvider mocks={mocks}>
            <Topic {...props} />
          </StorybookProvider>
        );
      }
    }
  ]
};
