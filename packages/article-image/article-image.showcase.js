import "react-native";
import React from "react";
import ArticleImage from "./src/article-image";
import primaryImageFixture from "./fixtures/primary-image";
import secondaryImageFixture from "./fixtures/secondary-image";
import landscapeInlineImageFixture from "./fixtures/landscape-inline-image";
import portraitInlineImageFixture from "./fixtures/portrait-inline-image";

const primaryImage = primaryImageFixture();
const secondaryImage = secondaryImageFixture();
const landscapeInlineImage = landscapeInlineImageFixture();
const portraitInlineImage = portraitInlineImageFixture();

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
