import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { fonts, colours, fontSizes } from "@times-components/styleguide";
import { selectV2, withKnobs } from "@storybook/addon-knobs";
import { decorateAction } from "@storybook/addon-actions";
import ArticleByline from "./src/article-byline";

const authorsAST = require("./fixtures/authors.json");

const bylineStyles = {
  fontSize: fontSizes.cardMeta,
  fontFamily: fonts.supporting,
  color: colours.functional.secondary,
  lineHeight: 13,
  flexDirection: "row"
};

const preventDefaultedAction = decorateAction([
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

const getCommonProps = () => ({
  /* We're using selectV2 over our own select abstraction as
   * it flips the keys and values. We don't want that behaviour.
   */
  color: selectV2("Section colours", colours.section),
  onAuthorPress: preventDefaultedAction("onAuthorPress")
});

storiesOf("Primitives/ArticleByline", module)
  .addDecorator(withKnobs)
  .add("ArticleByline with a single author", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.singleAuthor} {...getCommonProps()} />
    </Text>
  ))
  .add("ArticleByline with a text only element", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.singleInlineElement}
        {...getCommonProps()}
      />
    </Text>
  ))
  .add("ArticleByline with multiple authors", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        {...getCommonProps()}
      />
    </Text>
  ))
  .add("ArticleByline with author in the beginning", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.authorInTheBeginning}
        {...getCommonProps()}
      />
    </Text>
  ))
  .add("ArticleByline with author at the end", () => (
    <Text style={bylineStyles}>
      <ArticleByline ast={authorsAST.authorAtTheEnd} {...getCommonProps()} />
    </Text>
  ))
  .add("ArticleByline with styles", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        style={bylineLinkStyles}
        {...getCommonProps()}
      />
    </Text>
  ));
