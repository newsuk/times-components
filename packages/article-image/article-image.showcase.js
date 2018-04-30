import "react-native";
import React from "react";
import ArticleImage from "./src/article-image";

const primaryImage = require("./fixtures/primary-image.json").fixture;
const secondaryImage = require("./fixtures/secondary-image.json").fixture;
const landscapeInlineImage = require("./fixtures/landscape-inline-image.json")
  .fixture;
const portraitInlineImage = require("./fixtures/portrait-inline-image.json")
  .fixture;

export default {
  name: "Primitives/Article Image",
  children: [
    {
      type: "story",
      name: "Primary",
      component: () => (
        <ArticleImage
          imageOptions={primaryImage.imageOptions}
          captionOptions={primaryImage.captionOptions}
        />
      )
    },
    {
      type: "story",
      name: "Secondary",
      component: () => (
        <ArticleImage
          imageOptions={secondaryImage.imageOptions}
          captionOptions={secondaryImage.captionOptions}
        />
      )
    },
    {
      type: "story",
      name: "Inline (portrait)",
      component: () => (
        <ArticleImage
          imageOptions={portraitInlineImage.imageOptions}
          captionOptions={portraitInlineImage.captionOptions}
        />
      )
    },
    {
      type: "story",
      name: "Inline (landscape)",
      component: () => (
        <ArticleImage
          imageOptions={landscapeInlineImage.imageOptions}
          captionOptions={landscapeInlineImage.captionOptions}
        />
      )
    }
  ]
};
