import React from "react";
import { Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { select } from "@times-components/storybook";
import { fonts, colours, fontSizes } from "@times-components/styleguide";
import { boolean, withKnobs } from "@storybook/addon-knobs";
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

const sections = Object.assign(
  {},
  ...Object.keys(colours.section).map(section => ({ [section]: section })),
);

const ArticleBylineWithCommonProps = props => (
  <ArticleByline
    section={select("Section", sections, "default")}
    isCurrentEdition={boolean("Is current edition?", true)}
    isPastSixDays={boolean("Is past six days?", true)}
    onAuthorPress={preventDefaultedAction("onAuthorPress")}
    {...props}
  />
);

storiesOf("Primitives/ArticleByline", module)
  .addDecorator(withKnobs)
  .add("ArticleByline with a single author", () => (
    <Text style={bylineStyles}>
      <ArticleBylineWithCommonProps ast={authorsAST.singleAuthor} />
    </Text>
  ))
  .add("ArticleByline with a text only element", () => (
    <Text style={bylineStyles}>
      <ArticleBylineWithCommonProps ast={authorsAST.singleInlineElement} />
    </Text>
  ))
  .add("ArticleByline with multiple authors", () => (
    <Text style={bylineStyles}>
      <ArticleBylineWithCommonProps
        ast={authorsAST.multipleAuthorsCommaSeparated}
      />
    </Text>
  ))
  .add("ArticleByline with author in the beginning", () => (
    <Text style={bylineStyles}>
      <ArticleBylineWithCommonProps ast={authorsAST.authorInTheBeginning} />
    </Text>
  ))
  .add("ArticleByline with author at the end", () => (
    <Text style={bylineStyles}>
      <ArticleBylineWithCommonProps ast={authorsAST.authorAtTheEnd} />
    </Text>
  ))
  .add("ArticleByline with styles", () => (
    <Text style={bylineStyles}>
      <ArticleBylineWithCommonProps
        ast={authorsAST.multipleAuthorsCommaSeparated}
        style={bylineLinkStyles}
      />
    </Text>
  ));
