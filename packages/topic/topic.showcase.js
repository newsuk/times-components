import React from "react";
import { addTypenameToDocument } from "apollo-utilities";
import { topicArticlesQuery } from "@times-components/provider";
import StorybookProvider from "@times-components/storybook/storybook-provider";
import storybookReporter from "@times-components/tealium-utils";
import { TopicArticlesProvider } from "@times-components/provider";
import topicFixture from "./fixtures/topic.json";
import Topic from "./src/topic";

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

        return <Topic {...props} />;
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
          imageRatio: "3:2",
          page,
          pageSize,
          slug
        };

        return (
          <StorybookProvider mocks={mocks}>
            <TopicArticlesProvider
              debounceTimeMs={0}
              imageRatio={props.imageRatio}
              slug={slug}
            >
              {({ error, topic, isLoading }) => 
                <Topic
                  topic={Object.assign({}, topic, {
                    name: "Animals",
                    description:
                      "Animals are multicellular eukaryotic organisms"
                  })}
                  error={error}
                  isLoading={isLoading}
                  {...props}
                />
              }}
            </TopicArticlesProvider>
          </StorybookProvider>
        );
      }
    }
  ]
};
