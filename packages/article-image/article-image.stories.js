import "react-native";
import React from "react";
import { storiesOf } from "@storybook/react-native";
import ArticleImage from "./article-image";

const primaryImage = require("./fixtures/primary-image.json").fixture;
const secondaryImage = require("./fixtures/secondary-image.json").fixture;
const landscapeInlineImage = require("./fixtures/landscape-inline-image.json")
  .fixture;
const portraitInlineImage = require("./fixtures/portrait-inline-image.json")
  .fixture;

storiesOf("Primatives/ArticleImage", module)
  .add("Primary", () => (
    <ArticleImage
      imageOptions={primaryImage.imageOptions}
      captionOptions={primaryImage.captionOptions}
    />
  ))
  .add("Secondary", () => (
    <ArticleImage
      imageOptions={secondaryImage.imageOptions}
      captionOptions={secondaryImage.captionOptions}
    />
  ))
  .add("Inline (portrait)", () => (
    <ArticleImage
      imageOptions={portraitInlineImage.imageOptions}
      captionOptions={portraitInlineImage.captionOptions}
    />
  ))
  .add("Inline (landscape)", () => (
    <ArticleImage
      imageOptions={landscapeInlineImage.imageOptions}
      captionOptions={landscapeInlineImage.captionOptions}
    />
  ));
