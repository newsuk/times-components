import React from "react";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";
import landscapeInlineImageFixture from "../fixtures/landscape-inline-image";
import portraitInlineImageFixture from "../fixtures/portrait-inline-image";

const testImageUrl = "https://img/someImage";
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
