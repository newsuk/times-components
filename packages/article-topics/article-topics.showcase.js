import React from "react";
import ArticleTopics from "./src/article-topics";
import topicsData from "./fixtures/topics";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

export default {
  name: "Primitives/Article Topics",
  children: [
    {
      type: "story",
      name: "Group of Topics",
      component: (_, { decorateAction }) => (
        <ArticleTopics
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          topics={topicsData}
        />
      )
    },
    {
      type: "story",
      name: "Single Topic",
      component: (_, { decorateAction }) => (
        <ArticleTopics
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          topics={[topicsData[0]]}
        />
      )
    }
  ]
};
