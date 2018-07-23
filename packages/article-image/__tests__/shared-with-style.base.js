import React from "react";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import secondaryImageFixture from "../fixtures/secondary-image";
import landscapeInlineImageFixture from "../fixtures/landscape-inline-image";
import portraitInlineImageFixture from "../fixtures/portrait-inline-image";

const testImageUrl = "https://imageserver/someImage";
const primaryImage = primaryImageFixture(
  testImageUrl,
  "Some caption",
  "Some credits"
);
const secondaryImage = secondaryImageFixture(
  testImageUrl,
  "Another caption",
  "Other credits"
);
const landscapeInlineImage = landscapeInlineImageFixture(
  testImageUrl,
  "Landscape caption",
  "Landscape credits"
);
const portraitInlineImage = portraitInlineImageFixture(
  testImageUrl,
  "Portrait caption",
  "Portrait credits"
);

export default makeTest => {
  const tests = [
    {
      name: "primary image with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={primaryImage.captionOptions}
              imageOptions={primaryImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "secondary image with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={secondaryImage.captionOptions}
              imageOptions={secondaryImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "inline image (landscape) with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={landscapeInlineImage.captionOptions}
              imageOptions={landscapeInlineImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "inline image (portrait) with caption and credits",
      test: () => {
        expect(
          makeTest(
            <ArticleImage
              captionOptions={portraitInlineImage.captionOptions}
              imageOptions={portraitInlineImage.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
