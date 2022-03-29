import React from "react";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";
import primaryImageFixture from "../fixtures/primary-image";
import secondaryImageFixture from "../fixtures/secondary-image";

const testImageUrl = "https://img/someImage";
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

export default makeTest => {
  const tests = [
    {
      name: "mobile primary image with caption and credits",
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
    }
  ];

  iterator(tests);
};
