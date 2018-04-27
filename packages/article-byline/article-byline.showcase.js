/* eslint-disable react/prop-types */

import React from "react";
import { Text } from "react-native";
import { fonts, colours, fontSizes } from "@times-components/styleguide";
import ArticleByline from "./src/article-byline";

const authorsAST = require("./fixtures/authors.json");

const bylineStyles = {
  fontSize: fontSizes.cardMeta,
  fontFamily: fonts.supporting,
  color: colours.functional.secondary,
  lineHeight: 13,
  flexDirection: "row"
};

const preventDefaultedAction = decorateAction =>
  decorateAction([
    ([e, ...args]) => {
      e.preventDefault();
      return ["[SyntheticEvent (storybook prevented default)]", ...args];
    }
  ]);

const bylineLinkStyles = {
  link: {
    color: colours.functional.action,
    textDecorationLine: "none"
  }
};

const getCommonProps = (selectV2, decorateAction) => ({
  /* We're using selectV2 over our own select abstraction as
   * it flips the keys and values. We don't want that behaviour.
   */
  color: selectV2("Section colours", colours.section),
  onAuthorPress: preventDefaultedAction(decorateAction)("onAuthorPress")
});

export default {
  name: "Primitives/Article Byline",
  children: [
    {
      type: "story",
      name: "Article Byline with a single author",
      component: ({ selectV2 }, { decorateAction }) => (
        <Text style={bylineStyles}>
          <ArticleByline
            ast={authorsAST.singleAuthor}
            {...getCommonProps(selectV2, decorateAction)}
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Article Byline with a text only element",
      component: ({ selectV2 }, { decorateAction }) => (
        <Text style={bylineStyles}>
          <ArticleByline
            ast={authorsAST.singleInlineElement}
            {...getCommonProps(selectV2, decorateAction)}
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Article Byline with multiple authors",
      component: ({ selectV2 }, { decorateAction }) => (
        <Text style={bylineStyles}>
          <ArticleByline
            ast={authorsAST.multipleAuthorsCommaSeparated}
            {...getCommonProps(selectV2, decorateAction)}
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Article Byline with author in the beginning",
      component: ({ selectV2 }, { decorateAction }) => (
        <Text style={bylineStyles}>
          <ArticleByline
            ast={authorsAST.authorInTheBeginning}
            {...getCommonProps(selectV2, decorateAction)}
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Article Byline with author at the end",
      component: ({ selectV2 }, { decorateAction }) => (
        <Text style={bylineStyles}>
          <ArticleByline
            ast={authorsAST.authorAtTheEnd}
            {...getCommonProps(selectV2, decorateAction)}
          />
        </Text>
      )
    },
    {
      type: "story",
      name: "Article Byline with styles",
      component: ({ selectV2 }, { decorateAction }) => (
        <Text style={bylineStyles}>
          <ArticleByline
            ast={authorsAST.multipleAuthorsCommaSeparated}
            style={bylineLinkStyles}
            {...getCommonProps(selectV2, decorateAction)}
          />
        </Text>
      )
    }
  ]
};
