import React from "react";
import { iterator } from "@times-components/test-utils";
import landscapeInlineImageFixture from "../fixtures/landscape-inline-image";
import portraitInlineImageFixture from "../fixtures/portrait-inline-image";
import ArticleImage from "../src/article-image";

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

const testMarkup = [
  {
    children: [
      {
        attributes: {
          value: "test text"
        },
        children: [],
        name: "text"
      }
    ],
    name: "paragraph"
  }
];

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
            >
              {testMarkup}
            </ArticleImage>
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
            >
              {testMarkup}
            </ArticleImage>
          )
        ).toMatchSnapshot();
      }
    }
  ];
  iterator(tests);
};
