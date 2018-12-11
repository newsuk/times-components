/* eslint-disable react/prop-types */
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

const renderArticleTopics = ({ data, decorateAction }) => (
  <ArticleTopics
    onPress={preventDefaultedAction(decorateAction)("onPress")}
    topics={data}
  />
);

export default {
  children: [
    {
      component: (_, { decorateAction }) =>
        renderArticleTopics({ data: topicsData, decorateAction }),
      name: "Group of Topics",
      platform: "web",
      type: "story"
    },
    {
      component: (_, { decorateAction }) =>
        renderArticleTopics({ data: [topicsData[0]], decorateAction }),
      name: "Single Topic",
      platform: "web",
      type: "story"
    }
  ],
  name: "Primitives/Article Topics"
};
