/* eslint-disable react/prop-types */
import React from "react";
import { View } from "react-native";
import { ArticleBylineOpinion } from "./src/article-byline";

const authorsAST = require("./fixtures/authors.json");

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const ComponentWrapper = ({ children }) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{children}</View>
);

const getProps = decorateAction => ({
  onAuthorPress: preventDefaultedAction(decorateAction)("onAuthorPress")
});

export default {
  children: [
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <ArticleBylineOpinion
            ast={authorsAST.singleAuthor}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with a single author",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <ArticleBylineOpinion
            ast={authorsAST.singleAuthor}
            {...getProps(decorateAction)}
            opinionStyle={{ fontSize: 12, letterSpacong: 0.6, lineHeight: 12 }}
          />
        </ComponentWrapper>
      ),
      name: "Byline with a single author and style overriden",
      type: "story"
    }
  ],
  name: "Primitives/Article Byline/Opinion"
};
