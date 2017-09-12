import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from "@storybook/react-native";
import ArticleImage from "./article-image";

const primaryImage = require("./fixtures/primary-image.json").fixture;
const secondaryImage = require("./fixtures/secondary-image.json").fixture;
const landscapeInlineImage = require("./fixtures/landscape-inline-image.json")
  .fixture;
const portraitInlineImage = require("./fixtures/portrait-inline-image.json")
  .fixture;

storiesOf("ArticleImage", module)
  .add("Primary", () => <ArticleImage ast={primaryImage} />)
  .add("Secondary", () => <ArticleImage ast={secondaryImage} />)
  .add("Inline (portrait)", () => <ArticleImage ast={portraitInlineImage} />)
  .add("Inline (landscape)", () => <ArticleImage ast={landscapeInlineImage} />);
