import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { fonts, colours, fontSizes } from "@times-components/styleguide";
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

storiesOf("Primitives/ArticleByline", module)
  .add("ArticleByline with a single author", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.singleAuthor}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with a text only element", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.singleInlineElement}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with multiple authors", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with author in the beginning", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.authorInTheBeginning}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with author at the end", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.authorAtTheEnd}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with styles", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        style={bylineLinkStyles}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ));
