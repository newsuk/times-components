import React from "react";
import topicFixture from "./fixtures/topic.json";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { TopicArticlesProvider } from "@times-components/provider";
import Topic from "./src/topic";

import { addTypenameToDocument } from "apollo-utilities";
import { topicArticlesQuery } from "@times-components/provider";

const mocks = [
  {
    request: {
      query: addTypenameToDocument(topicArticlesQuery),
      variables: {
        slug: "animals",
        imageRatio: "3:2"
      }
    },
    result: topicFixture
  }
];


const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const page = 2;
const pageSize = 5;
const slug = "animals";
const name = "Animals";
const description = "Animals are multicellular eukaryotic organisms.";

export default {
  name: "Pages/Topic",
  children: [
    {
      type: "story",
      name: "Without provider",
      component: (_, { decorateAction }) => {
        const { name, description, articles } = topicFixture.data.topic;
        const props = {
          analyticsStream: storybookReporter,
          imageRatio: "3:2",
          topic: topicFixture.data.topic,
          isLoading: false,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          page,
          pageSize
        };

        return (
          <Topic {...props} />
        );
      }
    },
    {
      type: "story",
      name: "With Provider and Tracking",
      component: (_, { decorateAction }) => {
        const props = {
          analyticsStream: storybookReporter,
          onArticlePress: preventDefaultedAction(decorateAction)(
            "onArticlePress"
          ),
          page,
          pageSize,
          slug
        };

        return (
          <StorybookProvider mocks={mocks}>
            <TopicArticlesProvider debounceTimeMs={0} imageRatio={"3:2"} slug={slug}>
              {({ error, topic, isLoading }) => {
                console.log('props', topic);
                return (
                <Topic
                  topic={topic}
                  error={error}
                  isLoading={isLoading}
                  {...props}
                />
              )
            }
          }
          </TopicArticlesProvider>
        </StorybookProvider>
      )
    }
  }
  ]
};
