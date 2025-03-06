/* eslint-disable react/prop-types */
import React from "react";
import { TcView } from "@times-components/utils";
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
  <TcView style={{ flexDirection: "row", flexWrap: "wrap" }}>{children}</TcView>
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
            ast={authorsAST.authorInTheBeginning}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with a single author",
      type: "story"
    }
  ],
  name: "Primitives/Article Byline/Opinion"
};
