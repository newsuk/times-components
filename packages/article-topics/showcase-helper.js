/* eslint-disable react/prop-types */
import React from "react";
import ArticleTopics from "./src/article-topics";

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

export default ({ data, decorateAction }) => (
  <ArticleTopics
    onPress={preventDefaultedAction(decorateAction)("onPress")}
    topics={data}
  />
);
