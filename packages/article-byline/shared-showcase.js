/* eslint-disable react/prop-types */

import React from "react";
import { View } from "react-native";
import { colours, fonts, fontSizes } from "@times-components/styleguide";

const styles = {
  color: colours.section.comment,
  fontFamily: fonts.supporting,
  fontSize: fontSizes.cardMetaMobile,
  letterSpacing: 0.6,
  lineHeight: 12
};

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

export default (Component, name) => ({
  children: [
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <Component
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
          <Component
            ast={authorsAST.singleInlineElement}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with a text only element",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.multipleAuthorsPipeSeparated}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with multiple authors",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorInTheBeginning}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with author in the beginning",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorAtTheEnd}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with author at the end",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.veryLongByline}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline that is very long",
      type: "story"
    },
    {
      component: (_, { decorateAction }) => (
        <ComponentWrapper>
          <Component
            ast={authorsAST.authorInTheBeginning}
            bylineStyle={styles}
            {...getProps(decorateAction)}
          />
        </ComponentWrapper>
      ),
      name: "Byline with style overriden",
      type: "story"
    }
  ],
  name
});
