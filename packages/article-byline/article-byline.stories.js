import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { fonts, colours, fontSizes } from "@times-components/styleguide";
import { selectV2, withKnobs } from "@storybook/addon-knobs";
import { decorateAction } from "@storybook/addon-actions";
import ArticleByline from "./src/article-byline";
import { select } from "../storybook/src/storybook";
import section from "../styleguide/dist/colours/section";

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

const sections = Object.keys(colours.section);

storiesOf("Primitives/ArticleByline", module)
  .addDecorator(withKnobs)
  .add("ArticleByline with a single author", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.singleAuthor}
        section={selectV2('Section', sections, 'default')}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with a text only element", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.singleInlineElement}
        section={selectV2('Section', sections, 'default')}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with multiple authors", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        section={selectV2('Section', sections, 'default')}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with author in the beginning", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.authorInTheBeginning}
        section={selectV2('Section', sections, 'default')}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with author at the end", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.authorAtTheEnd}
        section={selectV2('Section', sections, 'default')}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ))
  .add("ArticleByline with styles", () => (
    <Text style={bylineStyles}>
      <ArticleByline
        ast={authorsAST.multipleAuthorsCommaSeparated}
        section={selectV2('Section', sections, 'default')}
        style={bylineLinkStyles}
        onAuthorPress={preventDefaultedAction("onAuthorPress")}
      />
    </Text>
  ));
