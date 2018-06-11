/* eslint-disable react/prop-types */

import React from "react";
import { colours } from "@times-components/styleguide";
import ArticleByline from "./src/article-byline";

const authorsAST = require("./fixtures/authors.json");

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const styles = {
  link: {
    color: colours.functional.action,
    textDecorationLine: "none"
  }
};

const getProps = (selectV2, decorateAction) => ({
  color: selectV2("Section colours: ", colours.section),
  onAuthorPress: preventDefaultedAction(decorateAction)("onAuthorPress")
});

export default {
  name: "Primitives/Article Byline",
  children: [
    {
      type: "story",
      name: "Article Byline with a single author",
      component: ({ selectV2 }, { decorateAction }) => (
        <ArticleByline
          ast={authorsAST.singleAuthor}
          {...getProps(selectV2, decorateAction)}
        />
      )
    },
    {
      type: "story",
      name: "Article Byline with a text only element",
      component: ({ selectV2 }, { decorateAction }) => (
        <ArticleByline
          ast={authorsAST.singleInlineElement}
          {...getProps(selectV2, decorateAction)}
        />
      )
    },
    {
      type: "story",
      name: "Article Byline with multiple authors",
      component: ({ selectV2 }, { decorateAction }) => (
        <ArticleByline
          ast={authorsAST.multipleAuthorsCommaSeparated}
          {...getProps(selectV2, decorateAction)}
        />
      )
    },
    {
      type: "story",
      name: "Article Byline with author in the beginning",
      component: ({ selectV2 }, { decorateAction }) => (
        <ArticleByline
          ast={authorsAST.authorInTheBeginning}
          {...getProps(selectV2, decorateAction)}
        />
      )
    },
    {
      type: "story",
      name: "Article Byline with author at the end",
      component: ({ selectV2 }, { decorateAction }) => (
        <ArticleByline
          ast={authorsAST.authorAtTheEnd}
          {...getProps(selectV2, decorateAction)}
        />
      )
    },
    {
      type: "story",
      name: "Article Byline with styles",
      component: ({ selectV2 }, { decorateAction }) => (
        <ArticleByline
          ast={authorsAST.multipleAuthorsCommaSeparated}
          style={styles}
          {...getProps(selectV2, decorateAction)}
        />
      )
    }
  ]
};
