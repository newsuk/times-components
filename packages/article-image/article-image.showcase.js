import React from "react";
import Responsive from "@times-components/responsive";
import ArticleImage from "./src/article-image";
import primaryImageFixture from "./fixtures/primary-image";
import secondaryImageFixture from "./fixtures/secondary-image";
import fullwidthImageFixture from "./fixtures/fullwidth-image";
import landscapeInlineImageFixture from "./fixtures/landscape-inline-image";
import portraitInlineImageFixture from "./fixtures/portrait-inline-image";

const primaryImage = primaryImageFixture();
const secondaryImage = secondaryImageFixture();
const fullwidthImage = fullwidthImageFixture();
const landscapeInlineImage = landscapeInlineImageFixture();
const portraitInlineImage = portraitInlineImageFixture();

const withResponsive = render => (...args) => (
  <Responsive>{render(...args)}</Responsive>
);

export default {
  children: [
    {
      // eslint-disable-next-line react/prop-types
      component: withResponsive(({ boolean }) => {
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
      }),
      name: "Primary",
      type: "story"
    },
    {
      component: withResponsive(() => (
        <ArticleImage
          captionOptions={secondaryImage.captionOptions}
          imageOptions={secondaryImage.imageOptions}
        />
      )),
      name: "Secondary",
      type: "story"
    },
    {
      component: withResponsive(() => (
        <ArticleImage
          captionOptions={fullwidthImage.captionOptions}
          imageOptions={fullwidthImage.imageOptions}
        />
      )),
      name: "Full Width",
      type: "story"
    },
    {
      component: withResponsive(() => (
        <ArticleImage
          captionOptions={portraitInlineImage.captionOptions}
          imageOptions={portraitInlineImage.imageOptions}
        />
      )),
      name: "Inline (portrait)",
      type: "story"
    },
    {
      component: withResponsive(() => (
        <ArticleImage
          captionOptions={landscapeInlineImage.captionOptions}
          imageOptions={landscapeInlineImage.imageOptions}
        />
      )),
      name: "Inline (landscape)",
      type: "story"
    }
  ],
  name: "Primitives/Article Image"
};
