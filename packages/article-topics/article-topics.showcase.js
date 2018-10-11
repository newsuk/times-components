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

export default {
  children: [
    {
      component: ({ select }, { decorateAction }) => {
        const scale = select("Scale", scales, scales.medium);
        return (
          <Context.Provider value={{ theme: { scale } }}>
            <ArticleTopics
              onPress={preventDefaultedAction(decorateAction)("onPress")}
              topics={topicsData}
            />
          </Context.Provider>
        );
      },
      name: "Group of Topics",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ArticleTopics
          onPress={preventDefaultedAction(decorateAction)("onPress")}
          topics={[topicsData[0]]}
        />
      ),
      name: "Single Topic",
      type: "story"
    }
  ],
  name: "Primitives/Article Topics"
};
