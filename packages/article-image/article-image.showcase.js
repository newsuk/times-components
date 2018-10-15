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
  children: [
    {
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
      },
      name: "Primary",
      type: "story"
    },
    {
      component: () => (
        <ArticleImage
          captionOptions={secondaryImage.captionOptions}
          imageOptions={secondaryImage.imageOptions}
        />
      ),
      name: "Secondary",
      type: "story"
    },
    {
      component: () => (
        <ArticleImage
          captionOptions={portraitInlineImage.captionOptions}
          imageOptions={portraitInlineImage.imageOptions}
        />
      ),
      name: "Inline (portrait)",
      type: "story"
    },
    {
      component: () => (
        <ArticleImage
          captionOptions={landscapeInlineImage.captionOptions}
          imageOptions={landscapeInlineImage.imageOptions}
        />
      ),
      name: "Inline (landscape)",
      type: "story"
    }
  ],
  name: "Primitives/Article Image"
};
