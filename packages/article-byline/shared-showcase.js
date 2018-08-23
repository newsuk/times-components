/* eslint-disable react/prop-types */

import React from "react";
import { View } from "react-native";
import { colours } from "@times-components/styleguide";

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

const ComponentWrapper = ({ children }) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{children}</View>
);

const getProps = (selectV2, decorateAction) => ({
  color: selectV2("Section colours: ", colours.section),
  onAuthorPress: preventDefaultedAction(decorateAction)("onAuthorPress")
});

export default (Component, name) => ({
  name,
  children: [
    {
      type: "story",
      name: "Article Byline with a single author",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.singleAuthor}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    },
    {
      type: "story",
      name: "Article Byline with a text only element",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.singleInlineElement}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    },
    {
      type: "story",
      name: "Article Byline with multiple authors",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.multipleAuthorsCommaSeparated}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    },
    {
      type: "story",
      name: "Article Byline with author in the beginning",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorInTheBeginning}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    },
    {
      type: "story",
      name: "Article Byline with author at the end",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorAtTheEnd}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    },
    {
      type: "story",
      name: "Article Byline with styles",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.multipleAuthorsCommaSeparated}
            style={styles}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    },
    {
      type: "story",
      name: "Article Byline that is impossibly long",
      component: ({ selectV2 }, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.veryLongByline}
            {...getProps(selectV2, decorateAction)}
          />
        </ComponentWrapper>
      )
    }
  ]
});
