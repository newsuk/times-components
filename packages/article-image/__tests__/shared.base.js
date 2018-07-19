import React from "react";
import { iterator } from "@times-components/test-utils";
import ArticleImage from "../src/article-image";

const testImageUrl = "https://imageserver/someImage";

export default makeTest => {
  const tests = [
    {
      name: "does not render an image if display is not received",
      test: () => {
        const noDisplay = {
          imageOptions: {
            display: null,
            ratio: "16:9",
            url: testImageUrl
          }
        };

        expect(
          makeTest(<ArticleImage imageOptions={noDisplay.imageOptions} />)
        ).toMatchSnapshot();
      }
    },
    {
      name: "does not render an image if ratio is not received",
      test: () => {
        const noRatio = {
          imageOptions: {
            display: "primary",
            ratio: null,
            url: testImageUrl
          }
        };

        expect(
          makeTest(<ArticleImage imageOptions={noRatio.imageOptions} />)
        ).toMatchSnapshot();
      }
    },
    {
      name: "image with no caption",
      test: () => {
        const primaryImageNoCaptionProps = {
          imageOptions: {
            display: "primary",
            ratio: "16:9",
            url: testImageUrl
          }
        };

        expect(
          makeTest(
            <ArticleImage
              imageOptions={primaryImageNoCaptionProps.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "image with caption",
      test: () => {
        const noCredits = {
          imageOptions: {
            display: null,
            ratio: "16:9",
            url: testImageUrl
          },
          captionOptions: {
            caption: "Some caption",
            credits: null
          }
        };

        expect(
          makeTest(
            <ArticleImage
              captionOptions={noCredits.captionOptions}
              imageOptions={noCredits.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    },
    {
      name: "image with credit",
      test: () => {
        const noCredits = {
          imageOptions: {
            display: null,
            ratio: "16:9",
            url: testImageUrl
          },
          captionOptions: {
            caption: null,
            credits: "Some credit"
          }
        };

        expect(
          makeTest(
            <ArticleImage
              captionOptions={noCredits.captionOptions}
              imageOptions={noCredits.imageOptions}
            />
          )
        ).toMatchSnapshot();
      }
    }
  ];

  iterator(tests);
};
