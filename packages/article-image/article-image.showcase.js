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
      // eslint-disable-next-line react/prop-types
      component: ({ boolean }) => {
        const withHighRes = boolean("As high resolution");

        const imageOptions = {
          ...primaryImage.imageOptions
        };

        if (withHighRes) {
          imageOptions.highResSize = 900;
        } else {
          imageOptions.lowResSize = 100;
        }

        return (
          <ArticleImage
            captionOptions={primaryImage.captionOptions}
            imageOptions={imageOptions}
          />
        );
      }
    },
    {
      type: "story",
      name: "Secondary",
      component: () => (
        <ArticleImage
          captionOptions={secondaryImage.captionOptions}
          imageOptions={secondaryImage.imageOptions}
        />
      )
    },
    {
      type: "story",
      name: "Inline (portrait)",
      component: () => (
        <ArticleImage
          captionOptions={portraitInlineImage.captionOptions}
          imageOptions={portraitInlineImage.imageOptions}
        />
      )
    },
    {
      type: "story",
      name: "Inline (landscape)",
      component: () => (
        <ArticleImage
          captionOptions={landscapeInlineImage.captionOptions}
          imageOptions={landscapeInlineImage.imageOptions}
        />
      )
    }
  ]
};
