/* eslint-disable react/prop-types */
import React from "react";
import Context from "@times-components/context";
import { scales } from "@times-components/styleguide";
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
      component: ({ select }, { decorateAction }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            {renderArticleTopics({ data: topicsData, decorateAction })}
          </Context.Provider>
        );
      },
      name: "Group of Topics",
      platform: "native",
      type: "story"
    },
    {
      component: ({ select }, { decorateAction }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            {renderArticleTopics({ data: [topicsData[0]], decorateAction })}
          </Context.Provider>
        );
      },
      name: "Single Topic",
      platform: "native",
      type: "story"
    }
  ],
  name: "Primitives/Article Topics"
};
